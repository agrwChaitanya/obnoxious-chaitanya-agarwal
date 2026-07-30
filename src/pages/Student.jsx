import { useState } from "react";

import menu from "../data/menu";
import MenuCard from "../components/MenuCard";
import Cart from "../components/Cart";

function Student() {
  // Cart State
  const [cart, setCart] = useState([]);

  // Add Item to Cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="page">
      <div className="menu-section">
        <h1>🍽 Smart Canteen</h1>
        <p className="subtitle">Order Ahead. Skip the Queue.</p>

        <div className="menu-grid">
          {menu.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      <Cart
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
      />
    </div>
  );
}

export default Student;