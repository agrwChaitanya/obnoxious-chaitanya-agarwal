function Cart({
  cart,
  increaseQty,
  decreaseQty,
  checkout
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">

      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">

              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>

              <div className="qty-controls">

                <button onClick={() => decreaseQty(item.id)}>
                  −
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}>
                  +
                </button>

              </div>

            </div>
          ))}

          <h3>Total : ₹{total}</h3>

          <button
            className="checkout-btn"
            onClick={checkout}
            >
            Proceed to Pickup Slot
            </button>

        </>
      )}

    </div>
  );
}

export default Cart;