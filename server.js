

const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");



dotenv.config();
const app = express();

// MongoDB connect
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit if cannot connect
});

// Middlewares
app.use(cors({
  origin: "https://scrapevent.netlify.app",
  credentials: true, // only if you plan to use cookies or sessions later
}));
app.use(express.json());

// Routes
app.use("/api", eventRoutes);
console.log("🔗 Event routes registered at /api/events");




// Server Start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
  require('./scraper/scrapeCron');
  
});
