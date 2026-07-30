function Token({ order, backToMenu }) {
  return (
    <div className="cart">

      <h1>🎉 Order Confirmed</h1>

      <hr />

      <h2>Token</h2>

      <h1>Token #{order.token}</h1>

      <hr />

      <p>
        <strong>Pickup Slot:</strong>
      </p>

      <h3>{order.pickupSlot}</h3>

      <hr />

      <p>
        <strong>Status</strong>
      </p>

      <h3>🟡 {order.status}</h3>

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