import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function PickupSlot({
  cart,
  back,
  onOrderPlaced
}){
  const [selectedSlot, setSelectedSlot] = useState("");

  // Longest prep time in the order
  const prepTime = Math.max(...cart.map((item) => item.prepTime));

  // Dummy slot data (later comes from Firebase)
  const slots = [
    { time: "1:20 - 1:30", occupied: 8 },
    { time: "1:30 - 1:40", occupied: 3 },
    { time: "1:40 - 1:50", occupied: 1 },
    { time: "1:50 - 2:00", occupied: 5 },
    { time: "2:00 - 2:10", occupied: 2 },
    { time: "2:10 - 2:20", occupied: 0 },
  ];

  const recommended =
    slots.find((slot) => slot.occupied <= 5) || slots[0];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = async () => {

  if (!selectedSlot) return;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  try {

    const docRef = await addDoc(collection(db, "orders"), {

      items: cart,

      total,

      pickupSlot: selectedSlot,

      status: "Preparing",

      createdAt: serverTimestamp()

    });

    onOrderPlaced({
    token: docRef.id.slice(0, 6).toUpperCase(),
    pickupSlot: selectedSlot,
    status: "Preparing",
    });

    console.log(docRef.id);

  } catch (err) {

    console.error(err);

  }

};

  return (
    <div className="cart">

      <h2>Pickup Slot</h2>

      <hr />

      <h3>Your Order</h3>

      {cart.map((item) => (
        <p key={item.id}>
          {item.name} × {item.quantity}
        </p>
      ))}

      <h3>Total : ₹{total}</h3>

      <hr />

      <p><strong>Estimated Preparation Time:</strong> {prepTime} mins</p>

      <hr />

      <h3>Choose Pickup Slot</h3>

      {slots.map((slot) => (

        <div className="slot-card" key={slot.time}>

          <div>

            <strong>{slot.time}</strong>

            <p>{slot.occupied}/10 occupied</p>

            {slot.time === recommended.time && (
              <span className="recommended">
                ⭐ Recommended
              </span>
            )}

          </div>

          <button
            onClick={() => setSelectedSlot(slot.time)}
          >
            Select
          </button>

        </div>

      ))}

      <hr />

      <p>

        <strong>Selected Slot:</strong>

        {" "}

        {selectedSlot || "None"}

      </p>

      <button
        className="checkout-btn"
        disabled={!selectedSlot}
        onClick={confirmOrder}
    >
        Confirm Order
    </button>

      <button
        className="checkout-btn"
        onClick={back}
      >
        Back to Cart
      </button>

    </div>
  );
}

export default PickupSlot;