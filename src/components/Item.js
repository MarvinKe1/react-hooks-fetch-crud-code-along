import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handle Add to Cart/Remove from Cart
  function handleAddToCartClick() {
    // Toggle isInCart status
    const updatedItem = { ...item, isInCart: !item.isInCart };
    
    // PATCH request to update server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: updatedItem.isInCart }),
    })
      .then((r) => r.json())
      .then((serverUpdatedItem) => {
        // Update state in parent component
        onUpdateItem(serverUpdatedItem);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  }

  
  function handleDeleteClick() {
    
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => {
       
        onDeleteItem(item);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
