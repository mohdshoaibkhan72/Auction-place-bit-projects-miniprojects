const express = require("express");
const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  placeBid,
} = require("../controllers/auctionController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/auction", authenticate, createAuction);
router.get("/auctions", getAllAuctions);
router.get("/auctions/:id", getAuctionById);
router.post("/bid/:id", authenticate, placeBid);

module.exports = router;
