const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables from .env

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER,  // use env variable
                pass: process.env.EMAIL_PASS   // use env variable
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  // sender email
            to,                           // receiver email
            subject,                      // email subject
            text                          // email message
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
