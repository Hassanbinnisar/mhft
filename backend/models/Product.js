const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, default: 'Tees' },
    images: [String], 
    image: { type: String }, 
    status: { 
        type: String, 
        // Hassan bhai, yahan spelling aur lafz wahi rakhein jo Admin dropdown mein hain
        enum: ['New Arrival', 'Sale', 'Sold Out', 'Limited', 'None'], 
        default: 'New Arrival' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);