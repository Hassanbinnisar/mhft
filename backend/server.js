// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const Product = require('./models/Product');
// const Order = require('./models/Order');

// const app = express(); 

// // --- Middleware ---
// app.use(cors()); 
// app.use(express.json());
// app.use('/uploads', express.static('uploads')); 

// const mongoURI = process.env.MONGO_URI;
// // Railway hamesha PORT environment variable deta hai, isay lazmi priority dein
// const PORT = process.env.PORT || 5000;

// // --- MongoDB Connection ---
// mongoose.connect(mongoURI)
//   .then(() => console.log("Hassan, MongoDB Connected! ✅"))
//   .catch((err) => console.log("Connection Error: ", err));

// // --- Image Storage Setup ---
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// // --- ROUTES ---

// // Health Check (Live site par "Cannot GET /" se bachne ke liye)
// app.get('/', (req, res) => {
//     res.send("Hassan, Backend is running live! 🚀");
// });

// // 1. Get All Products
// app.get('/api/products', async (req, res) => {
//     try {
//         const products = await Product.find().sort({ createdAt: -1 });
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // 2. Add Product (Dynamic URL Fix)
// app.post('/api/products', upload.array('images', 5), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: "Kam az kam ek image upload karein!" });
//         }

//         // --- YAHAN CHANGE HAI ---
//         // Localhost ki jagah dynamic domain use karein
//         const baseUrl =  `https://mhft-production.up.railway.app`;;

//         const imagePaths = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);

//         const newProduct = new Product({
//             title: req.body.title,
//             price: req.body.price,
//             description: req.body.description,
//             category: req.body.category || 'Tees',
//             status: req.body.status || 'New Arrival',
//             images: imagePaths, 
//             image: imagePaths[0] 
//         });

//         await newProduct.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         console.error("Upload Error:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // 3. Orders Route (Validation Optimized)
// app.post('/api/orders', async (req, res) => {
//     try {
//         const { customerName, address, city, phone, items, totalAmount } = req.body;

//         if (!customerName || !address || !phone || !items) {
//             return res.status(400).json({ message: "Zaroori details missing hain!" });
//         }

//         const newOrder = new Order({
//             ...req.body,
//             address: `${address}, ${city}`,
//             date: new Date()
//         });

//         await newOrder.save();
//         res.status(201).json({ message: "Order Received! ✅" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Baki ke routes (Delete/Update) same rahenge...
// app.get('/api/orders', async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ date: -1 });
//         res.json(orders);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(PORT, () => console.log(`Hassan, server is rocking on port ${PORT} 🚀`));
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs'); // Filesystem module
const path = require('path');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express(); 

// --- 1. FIXED: Automatic Uploads Folder Creation ---
// Railway par folder khud nahi banta, isliye ye code zaroori hai
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// --- 2. FIXED: Secure CORS for Frontend ---
app.use(cors({
    origin: ["https://mhft-c1ra.vercel.app", "http://localhost:5173"], // Aapka Vercel link
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); 

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// --- MongoDB Connection ---
mongoose.connect(mongoURI)
  .then(() => console.log("Hassan, MongoDB Connected! ✅"))
  .catch((err) => console.log("Connection Error: ", err));

// --- Image Storage Setup ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send("Hassan, Backend is running live! 🚀");
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- 3. FIXED: Dynamic URL for Images ---
app.post('/api/products', upload.array('images', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "Kam az kam ek image upload karein!" });
        }

        // Backend ka live domain
        const baseUrl = `https://mhft-production.up.railway.app`;

        const imagePaths = req.files.map(file => `${baseUrl}/uploads/${file.filename}`);

        const newProduct = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category || 'Tees',
            status: req.body.status || 'New Arrival',
            images: imagePaths, 
            image: imagePaths[0] 
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Upload Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, address, city, phone, items } = req.body;
        if (!customerName || !address || !phone || !items) {
            return res.status(400).json({ message: "Zaroori details missing hain!" });
        }

        const newOrder = new Order({
            ...req.body,
            address: `${address}, ${city}`,
            date: new Date()
        });

        await newOrder.save();
        res.status(201).json({ message: "Order Received! ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product nahi mila!" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Server error!" });
    }
});
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete route (Zaroori for Admin)
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Hassan, server is rocking on port ${PORT} 🚀`));