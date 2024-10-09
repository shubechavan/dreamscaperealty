const express = require("express");
const adminMiddleware = require('../middlewares/admin');
const { Admin, Property } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const sendEmail = require('../services/mailer');  

const getAdminSignupMessage = (username) => {
    return `Dear ${username},

We are delighted to welcome you to the Dreamscape Realty platform as an administrator. As part of your new role, you now have access to manage property listings, oversee transactions, and maintain the platform’s integrity. Your contributions are vital to the seamless functioning of our real estate system.

Below are some of the tasks you can manage as an admin:
- Create, update, and delete property listings.
- Monitor user activity and ensure a high-quality experience.
- Review and approve listings before they go live.
- Coordinate with other team members to ensure smooth operations.

Please feel free to explore your admin dashboard and start managing properties. Should you need any assistance, do not hesitate to reach out to our support team at support@dreamscaperealty.com. We are always here to assist you.

Once again, welcome aboard, and we look forward to your valuable contributions in helping Dreamscape Realty grow and thrive.

Best regards,  
The Dreamscape Realty Team  
www.dreamscaperealty.com  
support@dreamscaperealty.com`;
};


const getPropertyCreatedMessage = (username, propertyTitle) => {
    return `Dear ${username},

The property "${propertyTitle}" has been successfully added to Dreamscape Realty.

Keep up the great work managing the listings!

Best regards,
The Dreamscape Team`;
};

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await Admin.create({ username, password });
        
    
        const subject = "Welcome to Dreamscape Realty (Admin)";
        const message = getAdminSignupMessage(username); 
        await sendEmail(username, subject, message);  

        res.json({ msg: "Admin signup successful. Welcome email sent!" });
    } catch (error) {
        res.status(500).json({ msg: "Error occurred during signup", error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    
    if (admin) {
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ msg: "Incorrect username or password" });
    }
});

// Property Routes
router.post('/property', adminMiddleware, async (req, res) => {
    const { title, description, price, imagelink } = req.body;
    const username = req.headers.username;  // Assuming the admin's username is passed in headers

    try {
        const property = await Property.create({ title, description, price, imagelink });
        
        // Send notification email to admin
        const subject = "Property Created Successfully";
        const message = getPropertyCreatedMessage(username, title);  // Use helper function to generate the message
        await sendEmail(username, subject, message);  // Send email to admin
        
        res.json({ msg: "Property created successfully", propertyId: property._id });
    } catch (error) {
        res.status(500).json({ msg: "Error creating property", error: error.message });
    }
});

router.get('/property', adminMiddleware, async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ msg: "Error fetching properties", error: error.message });
    }
});

module.exports = router;
