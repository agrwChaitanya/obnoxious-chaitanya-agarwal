import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

import { db } from "../firebase";

function Merchant({ goHome }) {

  const [orders, setOrders] = useState([]);



useEffect(() => {

  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setOrders(data);

  });

  return () => unsubscribe();

}, []);

const updateStatus = async (id, status) => {

  await updateDoc(
    doc(db, "orders", id),
    {
      status
    }
  );

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

    {orders
  .filter(order => order.status !== "Collected")
  .map(order => (

      <div className="order-card" key={order.id}>

        <div className="order-top">

          <h2>
            🎫 Token #{order.token}
            </h2>

          <span className={`status ${order.status.toLowerCase()}`}>
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