# Subscription Dashboard with Razorpay Integration

A full-stack subscription management dashboard built to handle dynamic subscription plans, user authentication, and a complete checkout flow using Razorpay. It includes advanced features like prorated billing for plan upgrades and seamless free plan downgrades.

## Features
- **User Authentication**: Secure login and signup flow using JWT and bcrypt.
- **Dynamic Subscription Plans**: Fetches subscription plans directly from MongoDB.
- **Razorpay Integration**: End-to-end payment integration using the Razorpay Node SDK and Razorpay Web Checkout.
- **Prorated Upgrades & Downgrades**: Intelligently calculates unused value of a current plan and discounts it from an upgrade. Automatically handles downgrades instantly via seamless free switches.
- **Modern UI**: Fully responsive UI built with Tailwind CSS, React, and Lucide icons.

## Tech Stack Used
**Frontend:**
- React (Vite)
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- Axios
- Razorpay Checkout SDK

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- Razorpay Node SDK
- JSON Web Token (JWT)
- bcryptjs

---

## Setup and Run Instructions

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- Razorpay Test Account Credentials

### 2. Installation
Clone the repository, then install dependencies for both the frontend and backend.

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Variables
You need to create a `.env` file in both the `server` and `client` directories.

**Backend (`server/.env`)**
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Razorpay Test Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY_ID=your_razorpay_secret_key
```

**Frontend (`client/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Running the Application
You can run the frontend and backend concurrently in two separate terminal windows.

**Run Backend Server:**
```bash
cd server
npm run dev
```
*The backend will start on http://localhost:3000*

**Run Frontend App:**
```bash
cd client
npm run dev
```
*The frontend will start on http://localhost:5173*

### 5. Seeding the Database (Optional)
If you want to populate your database with initial subscription plans and an admin user, you can run the seed scripts:
```bash
cd server
npm run seed:plans
npm run seed:admin
```

---

## Application Structure & Routes

### Frontend Routes
- `/login` - User authentication and sign in.
- `/register` - New user account creation.
- `/` (Dashboard) - Protected route. Shows the user's active subscription details.
- `/plans` - Protected route. Displays available pricing plans and handles upgrade/downgrade logic.
- `/admin` - Protected admin-only route. Displays a data table of all users and their subscription statuses.

### Backend API Routes
**Auth (`/api/auth`)**
- `POST /register` - Creates a new user and hashes their password.
- `POST /login` - Authenticates user and issues a JWT stored in an HTTP-only cookie.
- `POST /logout` - Clears the JWT cookie.

**Plans (`/api/plans`)**
- `GET /` - Fetches all active pricing plans available for subscription.

**Subscriptions (`/api/subscription`)**
- `GET /my-subscription` - Returns the logged-in user's current active subscription.
- `POST /create-order` - Generates a Razorpay order ID. Calculates prorated discounts for upgrades or handles free plan downgrades.
- `POST /verify` - Verifies the cryptographic signature from Razorpay after a successful payment.
- `GET /admin/subscriptions` - Admin-only endpoint to fetch all users' subscriptions for the admin dashboard.

---

## Test Credentials
If you've run the admin seed script, you can log into the Admin Dashboard using:
- **Email:** `admin@gmail.com`
- **Password:** `admin@1234`

---

## Author & Contact Details

**Imran Nazeer**
- **Email:** [imrannazeers.work@gmail.com](mailto:imrannazeers.work@gmail.com)
- **Phone:** +91 97518 06967
- **LinkedIn:** [https://www.linkedin.com/in/imrannazeers/](https://www.linkedin.com/in/imrannazeers/)
