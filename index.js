require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const fileUpload = require("express-fileupload");
var path = require("path");
// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yaml");

// Routes
const authRoutes = require("./routes/auth.route");
const doctorsRoutes = require("./routes/doctor.route");
const adminsRoutes = require("./routes/admins.route");
const secretariesRoutes = require("./routes/secretaries.route");
const departmentsRoutes = require("./routes/departments.route");
const diagnosisRoutes = require("./routes/diagnosis.route");
const patientsRoutes = require("./routes/patients.route");
const chatsRoutes = require("./routes/chats.route");
const messagesRoutes = require("./routes/messages.route");

const app = express();

// Db connection
const DbConnect = require("./utils/dbConnect");
DbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const dir = path.join(__dirname, "uploads");
app.use("/static", express.static(dir));

// set security http headers
app.use(helmet());

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
    max: 1000, //   max number of limits
    windowMs: 60 * 60 * 1000, // hour
    message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api", limiter);

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

app.get("/", (req, res) => {
    res.send("App running....");
});
app.get("/api", (req, res) => {
    res.send("App running....");
});

// API Docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/secretaries", secretariesRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/messages", messagesRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
    res.status(404).send(`Can't find ${req.originalUrl} on the server`);
});

// Start server
const PORT = process.env.PORT || 9003;
const server = app.listen(PORT, () =>
    console.log(`Server running on port : ${PORT}`)
);

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room " + room);
    });

    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        console.log(newMessageReceived);

        if (!chat.users) return console.log("chat.users not defined");

        const userId = chat.users.find(
            (user) => user._id !== newMessageReceived.sender._id
        )._id;

        socket.broadcast.to(userId).emit("message received", newMessageReceived);

        // chat.users.forEach((user) => {
        //     if (user._id === newMessageReceived.sender._id) return;

        // });
    });
});
