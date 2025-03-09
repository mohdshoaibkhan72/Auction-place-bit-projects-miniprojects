import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null); // Change initial state to null
  const [bid, setBid] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage(
          `Error fetching auction item: ${
            error.response?.data?.message || error.message
          }`
        );
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    if (!item) return;

    if (item.isClosed) {
      setMessage("This auction is closed. No more bids allowed.");
      return;
    }

    const username = prompt("Enter your username to place a bid:");
    if (!username) {
      setMessage("Bid canceled. Username is required.");
      return;
    }

    if (bid <= item.currentBid) {
      setMessage("Bid must be higher than the current bid.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/bid/${id}`, {
        bid,
        username,
      });
      setMessage(res.data.message);

      if (res.data.winner) {
        setMessage(`Auction closed. Winner: ${res.data.winner}`);
      }

      // 🔹 Update item details after a successful bid
      setItem((prevItem) => ({
        ...prevItem,
        currentBid: bid,
        highestBidder: username,
      }));
    } catch (error) {
      setMessage("Error placing bid.");
      console.error(error);
    }
  };

  return (
    <div>
      {item ? (
        <>
          <h2>{item.itemName}</h2>
          <p>{item.description}</p>
          <p>Current Bid: ${item.currentBid}</p>
          <p>Highest Bidder: {item.highestBidder || "No bids yet"}</p>

          {!item.isClosed && (
            <>
              <input
                type="number"
                value={bid}
                onChange={(e) => setBid(Number(e.target.value))}
                placeholder="Enter your bid"
              />
              <button onClick={handleBid}>Place Bid</button>
            </>
          )}

          {item.isClosed && <p style={{ color: "red" }}>Auction Closed</p>}
        </>
      ) : (
        <p>Loading auction details...</p>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuctionItem;
