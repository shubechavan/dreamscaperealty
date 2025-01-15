const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
require('dotenv').config(); // Load environment variables

// Initializing Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable Cross-Origin Requests
app.use(helmet());  // Set various HTTP headers for security
app.use(morgan('dev'));  // Log HTTP requests
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit to 100 requests per window
}));  

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
