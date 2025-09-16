const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "https://online-food-delivery-frontend-sovx.onrender.com",  // frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected 💕"))
.catch(err => console.log(err));

// Models
const Category = mongoose.model("Category", new mongoose.Schema({
    name: String
}));

const Food = mongoose.model("Food", new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String
}));

const Order = mongoose.model("Order", new mongoose.Schema({
    userName: String,
    items: Array, // [{foodId, qty}]
    totalAmount: Number,
    status: { type: String, default: "Pending" }, // Pending, Preparing, Out for Delivery, Delivered
    paymentStatus: { type: String, default: "Not Paid" }
}));

// Routes
// Categories
app.get("/", (req, res) => {
  res.send("🍔 Online Food Delivery Backend is running!");
});

app.post("/categories", async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
});

app.get("/categories", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Foods
app.post("/foods", async (req, res) => {
    const food = new Food(req.body);
    await food.save();
    res.json(food);
});

app.get("/foods", async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

app.get("/foods/category/:cat", async (req, res) => {
    const foods = await Food.find({ category: req.params.cat });
    res.json(foods);
});

// Orders
app.post("/orders", async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
});

app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

app.put("/orders/:id/status", async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
});

app.put("/orders/:id/payment", async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { paymentStatus: "Paid" }, { new: true });
    res.json(order);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
