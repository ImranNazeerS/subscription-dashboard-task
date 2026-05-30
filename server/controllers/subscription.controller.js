import Subscription from '../models/Subscription.js';
import Plan from '../models/Plan.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Payment from '../models/Payment.js';

let razorpayInstance;
const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY_ID,
    });
  }
  return razorpayInstance;
};

export const createOrder = async (req, res) => {
  try {
    const { planId, currency = 'USD' } = req.body; // or INR depending on requirements
    
    if (!planId) {
      return res.status(400).json({ status: false, message: "Plan ID is required" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(400).json({ status: false, message: "Invalid plan selected" });
    }

    const options = {
      amount: plan.price * 100, // Razorpay amount in smallest unit (e.g. cents/paise)
      currency,
      receipt: `receipt_${req.user._id}_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);
    
    return res.status(200).json({
      status: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      duration: plan.duration,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ status: false, message: "Error creating order", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
    } = req.body;
    const userId = req.user._id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY_ID);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ status: false, message: "Invalid payment signature" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(400).json({ status: false, message: "Invalid plan selected" });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.duration);

    // Using mongoose session for atomic operation
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Cancel existing active subscriptions for this user
      await Subscription.updateMany(
        { user: userId, status: 'active' },
        { $set: { status: 'cancelled' } },
        { session }
      );

      const subscription = await Subscription.create([{
        user: userId,
        plan: planId,
        start_date: startDate,
        end_date: endDate,
        status: 'active',
      }], { session });

      await Payment.create([{
        user: userId,
        plan: planId,
        subscription: subscription[0]._id,
        razorpay_order_id,
        razorpay_payment_id,
        amount: plan.price,
        status: 'success',
      }], { session });

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        status: true,
        message: "Payment verified and subscription created successfully",
        subscription: subscription[0]
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error in transaction:", error);
      return res.status(500).json({ status: false, message: "Error saving subscription data" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ status: false, message: "Error checking signature" });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: 'active',
    }).populate('plan');

    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // Find users matching the search query
      const matchingUsers = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      
      const userIds = matchingUsers.map(user => user._id);
      query = { user: { $in: userIds } };
    }

    const subscriptions = await Subscription.find(query)
      .populate('user', 'name email')
      .populate('plan', 'name price')
      .sort({ createdAt: -1 });

    res.json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
