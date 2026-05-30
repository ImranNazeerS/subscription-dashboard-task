import express from 'express';
import {
  createOrder,
  verifyPayment,
  getMySubscription,
  getAllSubscriptions,
} from '../controllers/subscription.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-subscription', protect, getMySubscription);
router.get('/admin/subscriptions', protect, admin, getAllSubscriptions);

export default router;
