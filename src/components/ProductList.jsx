import React from 'react';

function ProductList({ products, cart, addToCart, removeFromCart }) {
  const getQuantity = (productId) => {
    const productInCart = cart.find(item => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-item">
          <span>{product.name} - ${product.price}</span>
          <div className="quantity-controls">
            <button onClick={() => removeFromCart(product)}>-</button>
            <span>{getQuantity(product.id)}</span>
            <button onClick={() => addToCart(product)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
