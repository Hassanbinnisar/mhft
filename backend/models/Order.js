const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String, // Checkout component ke mutabiq
    email: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String,
    items: [
        {
            title: String,
            price: Number,
            qty: Number,
            size: String,
            image: String
        }
    ],
    totalAmount: Number,
    shippingMethod: { type: String, default: 'Standard' },
    status: { type: String, default: 'Pending' }, // Taake aap admin mein status track kar saken
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);