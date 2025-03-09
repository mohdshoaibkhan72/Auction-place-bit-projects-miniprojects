import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(""); // Added error state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auctions"); // Ensure correct API endpoint
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching auctions:", err);
        setError("Failed to load auctions. Please try again.");
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Auction Dashboard</h2>

      {/* 🔹 Logout Button */}

      <Link to="/post-auction">
        <button>Post New Auction</button>
      </Link>

      {/* 🔹 Display API Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item._id}>
              <Link to={`/auction/${item._id}`} style={{ color: "white" }}>
                {item.itemName} - Current Bid: ${item.currentBid}{" "}
                {item.isClosed ? "(Closed)" : ""}
              </Link>
            </li>
          ))
        ) : (
          <li style={{ color: "white", fontStyle: "italic" }}>
            No auctions available.
          </li>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
