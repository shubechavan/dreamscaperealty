const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB, retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

const SchemaOptions = { timestamps: true };

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, SchemaOptions);

AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchasedProperties: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
}, SchemaOptions);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const propertySchema = new mongoose.Schema({ title: { type: String, required: true },
     description: { type: String, required: true }, 
     price: { type: Number, required: true }, 
     address: { type: String, required: true },
     city: { type: String, required: true }, 
     country: { type: String, required: true },
     image: { type: String, required: true }, 
     facilities: { bathrooms: { type: String, required: true },
     parking: { type: String, required: true },
     bedrooms: { type: String, required: true } },
     userEmail: { type: String, required: true }, 
     createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } },
    SchemaOptions);


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);

module.exports = {
    Admin,
    User,
    Property,
    mongooseConnection: mongoose.connection
};
