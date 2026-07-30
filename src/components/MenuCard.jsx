function MenuCard({ item, addToCart }) {
  return (

    <div className="card">

      <h2>{item.name}</h2>

      <p>₹{item.price}</p>

      <p>Prep Time : {item.prepTime} mins</p>

      <p>Inventory : {item.inventory}</p>

      <span className="tag">
        {item.tag}
      </span>

      <button
        onClick={() => addToCart(item)}
      >
        Add to Cart
      </button>

    </div>

  );
}

export default MenuCard;