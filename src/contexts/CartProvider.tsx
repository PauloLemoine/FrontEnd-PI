import { createContext, useEffect, useState } from 'react';
import { ICartContext } from '../interfaces/ICartContext';
import { ICartItem } from '../interfaces/ICartItem';
import { getCartLocalStorage, setCartLocalStorage } from './utils';

export const CartContext = createContext<ICartContext>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => [],
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const cartLocalStorage = getCartLocalStorage();
    if (cartLocalStorage) {
      setCart([...cartLocalStorage]);
    }
  }, []);

  const addToCart = (item: ICartItem) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem } : cartItem
        );
      }
      setCartLocalStorage([...prevCart, item]);
      console.log(cart);
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCartLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
