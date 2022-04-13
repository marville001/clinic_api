require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// Routes
const authRoutes = require("./routes/auth.route");
const doctorRoutes = require("./routes/doctor.route");

const app = express();

// Db connection
const DbConnect = require("./utils/dbConnect");
DbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set security http headers
app.use(helmet());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 1000, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api/v1", limiter);

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

app.get("/", (req, res) => {
  res.send("App running....");
});

app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);


// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  res.status(404).send(`Can't find ${req.originalUrl} on the server`);
});

// Start server
const PORT = process.env.PORT || 9003;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));