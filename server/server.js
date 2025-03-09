require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const auctionRoutes = require("./routes/auctionRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));

app.use("/api", authRoutes);
app.use("/api", auctionRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to Auction API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
