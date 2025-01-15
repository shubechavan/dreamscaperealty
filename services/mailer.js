const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
    try {
        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // Use Gmail service
            auth: {
                user: process.env.EMAIL_USER,  // Your email address from the environment variables
                pass: process.env.EMAIL_PASS,  // Your email password from the environment variables
            },
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,  // sender's email address
            to,                           // recipient's email address
            subject,                      // subject of the email
            text,                         // body text of the email
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
