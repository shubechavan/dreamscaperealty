const mongoose = require('mongoose');

// Database Connection
require('dotenv').config(); 
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Define schemas
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String
});

const UserSchema = new Schema({
    username: String,
    password: String,
    purchasedProperties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
});

const PropertySchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imagelink: String,
});

// Create models
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);

// Export models
module.exports = {
    Admin,
    User,
    Property
};
    