const Newsletter = require("../models/Newsletter");

exports.subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ message: "Already subscribed." });

    const newSub = new Newsletter({ email });
    await newSub.save();
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};