const nodemailer = require('nodemailer');
require('dotenv').config();  

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,  
                pass: process.env.EMAIL_PASS   
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
