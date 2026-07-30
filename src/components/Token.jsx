import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function Token({ order, backToMenu }) {

  const [liveOrder, setLiveOrder] = useState(order);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      doc(db, "orders", order.id),
      (docSnap) => {

        if (docSnap.exists()) {
          setLiveOrder({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }

      }
    );

    return () => unsubscribe();

  }, [order.id]);

  return (
    <div className="cart">

      <h1>🎉 Order Confirmed</h1>

      <hr />

      <h2>Token #{liveOrder.token}</h2>

      <hr />

      <p>
        <strong>Pickup Slot:</strong>
      </p>

      <h3>{liveOrder.pickupSlot}</h3>

      <hr />

      <p>
        <strong>Order Status</strong>
      </p>

      <div className="progress">

        <div
          className={
            liveOrder.status === "Preparing" ||
            liveOrder.status === "Ready" ||
            liveOrder.status === "Collected"
              ? "step active"
              : "step"
          }
        >
          🍳 Preparing
        </div>

        <div
          className={
            liveOrder.status === "Ready" ||
            liveOrder.status === "Collected"
              ? "step active"
              : "step"
          }
        >
          ✅ Ready for Pickup
        </div>

        <div
          className={
            liveOrder.status === "Collected"
              ? "step active"
              : "step"
          }
        >
          📦 Collected
        </div>

      </div>

      <button
        className="checkout-btn"
        onClick={backToMenu}
      >
        Back to Menu
      </button>

    </div>
  );
}

export default Token;