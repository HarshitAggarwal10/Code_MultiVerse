const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

dotenv.config();
connectDB(); // connect MongoDB

require("./passport"); // load Passport strategies

const authRoutes = require("./routes/authRoutes");
const domainRoutes = require('./routes/domainRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const userCourseRoutes = require('./routes/userCourseRoutes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Session configuration for Passport
app.use(session({
  secret: process.env.SESSION_SECRET || "super-secret-session",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);                        // ✅ for Google & GitHub OAuth
app.use("/api/newsletter", require("./routes/newsletter")); // ✅ newsletter
app.use("/api/auth", require("./routes/auth")); 
app.use('/api/domains', domainRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/user-courses', userCourseRoutes); 
app.use("/api/user", authRoutes);          // ✅ email/password login

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
