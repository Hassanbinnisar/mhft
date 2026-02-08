require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express(); 

// --- Middleware ---
app.use(cors()); 
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// --- MongoDB Connection ---
mongoose.connect(mongoURI)
  .then(() => console.log("Hassan, MongoDB Bash Connected! ✅"))
  .catch((err) => console.log("Connection Error: ", err));

// --- Image Storage Setup ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- ROUTES ---

// 1. Get All Products (Sorted by Latest)
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Naye items pehle
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get Single Product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product nahi mila!" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 3. Add Product (Multiple Images + Status + Description)
app.post('/api/products', upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Kam az kam ek image upload karein!" });
        }

        // Image URL formatting
        const imagePaths = req.files.map(file => `http://localhost:${PORT}/uploads/${file.filename}`);

        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category || 'Tees',
            status: req.body.status || 'New Arrival',
            images: imagePaths, 
            image: imagePaths[0] // Main thumbnail
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 4. Update Product Status (Sold Out / Sale / New Arrival)
app.put('/api/products/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            { status: status }, 
            { new: true }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: "Update fail ho gaya!" });
    }
});

// 5. Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product Deleted Successfully! 🗑️" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Orders Routes (Full Address Support)
app.post('/api/orders', async (req, res) => {
    try {
        const { 
            customerName, 
            email, 
            address, 
            city, 
            postalCode, 
            phone, 
            items, 
            totalAmount 
        } = req.body;

        // Backend Validation
        if (!customerName || !address || !phone || !items || items.length === 0) {
            return res.status(400).json({ message: "Details missing hain!" });
        }

        const newOrder = new Order({
            customerName, 
            email,
            // City aur Postal code ko address ke sath merge kar rahe hain packing ke liye
            address: `${address}, ${city} ${postalCode ? `- ${postalCode}` : ''}`, 
            phone,
            items,
            totalAmount,
            date: new Date()
        });

        await newOrder.save();
        res.status(201).json({ message: "Order Received! ✅" });
    } catch (err) {
        console.error("Order Save Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 7. Get All Orders (Admin Dashboard)
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Delete/Complete Order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order Completed & Deleted! ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Hassan, server is rocking on port ${PORT} 🚀`));