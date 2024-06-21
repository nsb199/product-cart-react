import React, { useReducer } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles.css';

const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

const initialState = {
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const itemInCart = state.cart.find(item => item.id === action.product.id);
      if (itemInCart) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.product, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item.id === action.product.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter(item => item.quantity > 0),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', product });
  };

  return (
    <div className="app">
      <ProductList products={Products} cart={state.cart} addToCart={addToCart} removeFromCart={removeFromCart} />
      <Cart cart={state.cart} />
    </div>
  );
}

export default App;
