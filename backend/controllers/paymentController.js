// controllers/paymentController.js
const Razorpay = require("razorpay");
const UserCourse = require("../models/UserCourse");
require("dotenv").config();


if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('RAZORPAY_KEY_ID / SECRET not set in environment');
}

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Create order
exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // ₹ → paise
    currency: "INR",
    receipt: `receipt_order_${Math.random().toString(36).slice(2)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

// Mark payment as successful
exports.confirmPayment = async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user._id;

  try {
    const course = await UserCourse.findOne({ userId, subject: subjectId });
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.paymentStatus = "paid";
    course.paymentDate = new Date();
    await course.save();

    res.status(200).json({ message: "Payment marked as paid" });
  } catch (err) {
    res.status(500).json({ message: "Payment update failed", error: err.message });
  }
};
