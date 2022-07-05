require("dotenv").config();
const express = require("express");
const cors = require("cors");
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
const appointmentsRoutes = require("./routes/appointments.route");
const notificationsRoutes = require("./routes/notifications.route");

const app = express();

// Db connection
const DbConnect = require("./utils/dbConnect");
const Notification = require("./models/notifications.model");
DbConnect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const dir = path.join(__dirname, "uploads");
app.use("/static", express.static(dir));

// set security http headers
app.use(helmet());


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
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/notifications", notificationsRoutes);

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
    // console.log("Connected to socket.io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        // console.log("User joined room " + room);
    });

    socket.on("typing", (room) =>
        socket.broadcast.to(room).emit("typing", room)
    );
    socket.on("stop typing", (room) =>
        socket.broadcast.to(room).emit("stop typing")
    );

    socket.on("new notification", async (details) => {
        const { room, notification } = details;

        const result = await Notification.create({
            ...notification,
            userId: room,
        });
        
        result.save({ validateBeforeSave: false });

        socket.broadcast.to(room).emit("new notification", result);
    });

    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        const userId = chat.users.find(
            (user) => user.user !== newMessageReceived.sender._id
        ).user;

        socket.in(userId).emit("message received", newMessageReceived);
    });
});
