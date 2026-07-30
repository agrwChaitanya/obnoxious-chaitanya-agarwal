import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../firebase";

function Merchant({ goHome }) {

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {

    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "asc")
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data()
    }));

    setOrders(data);

  };

  useEffect(() => {

    loadOrders();

  }, []);

  const updateStatus = async (id, status) => {

    await updateDoc(doc(db, "orders", id), {
      status
    });

    loadOrders();

  };

return (
  <div className="merchant">

    <div style={{ marginBottom: "20px" }}>
      <button
        className="checkout-btn"
        onClick={goHome}
      >
        🏠 Home
      </button>
    </div>

    <h1>🧑‍🍳 Merchant Dashboard</h1>

    {orders.length === 0 && (
      <h3>No Orders Yet</h3>
    )}

    {orders.map((order) => (

      <div className="order-card" key={order.id}>

        <div className="order-top">

          <h2>
            🎫 {order.id.slice(0, 6).toUpperCase()}
          </h2>

          <span className="status">
            {order.status}
          </span>

        </div>

        <hr />

        <h4>Items</h4>

        {order.items.map((item) => (

          <p key={item.id}>
            {item.name} × {item.quantity}
          </p>

        ))}

        <p>
          <strong>Pickup Slot:</strong>{" "}
          {order.pickupSlot}
        </p>

        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>

        <div className="merchant-buttons">

          <button
            onClick={() =>
              updateStatus(order.id, "Preparing")
            }
          >
            Preparing
          </button>

          <button
            onClick={() =>
              updateStatus(order.id, "Ready")
            }
          >
            Ready
          </button>

          <button
            onClick={() =>
              updateStatus(order.id, "Collected")
            }
          >
            Collected
          </button>

        </div>

      </div>

    ))}

  </div>
);

}

export default Merchant;