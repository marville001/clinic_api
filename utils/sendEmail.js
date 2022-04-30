require("dotenv").config()
const nodemailer = require("nodemailer");

function createTransporter(config) {
    let transporter = nodemailer.createTransport(config);
    return transporter;
}

const defaultConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
};

const sendEmail = async (email) => {
    const transporter = createTransporter(defaultConfig);
    await transporter.verify();
    await transporter.sendMail(email);
};


module.exports = sendEmail;
