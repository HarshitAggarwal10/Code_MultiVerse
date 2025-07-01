const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');

dotenv.config();
connectDB(); // connect MongoDB

require("./passport"); // load Passport strategies

const authRoutes = require("./routes/authRoutes");
const domainRoutes = require('./routes/domainRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const userCourseRoutes = require('./routes/userCourseRoutes');

const app = express();

app.use(cors({
  origin: "https://code-multi-verse.vercel.app", // ✅ Vercel URL
  credentials: true, // keep if you ever use cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: 'sid',                           // custom cookie name
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,       // reuse your connectDB URI
      ttl: 7 * 24 * 60 * 60             // 7-day session in DB
    }),
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,             // ✅ Important on HTTPS/Render
      sameSite: 'none',      // 7-day cookie in browser
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);                        // ✅ for Google & GitHub OAuth
app.use("/api/newsletter", require("./routes/newsletter")); // ✅ newsletter
app.use("/api/auth", require("./routes/auth"));
app.use('/api/domains', domainRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/user-courses', userCourseRoutes);
app.use("/api/user", authRoutes);
app.use('/api/quiz', require('./routes/userCourseRoutes')); // ✅ quiz submission
app.use('/api/challenges', require('./routes/challengeRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));


(app._router?.stack || [])
  .filter(r => r.route)
  .forEach(r => console.log(`[ROUTE] ${r.route.stack[0].method.toUpperCase()} ${r.route.path}`));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
