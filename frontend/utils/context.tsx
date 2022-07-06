import React, { createContext, useContext, useState } from "react";

interface Props {
  qty: number;
}
const StoreContext = createContext<any>(null);

export const StateContext: React.FC<any> = ({ children }) => {
  // data
  const [qty, setQty] = useState<number>(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  //Increase product countity
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //Decrease product quantity
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <StoreContext.Provider
      value={{ qty, increaseQty, decreaseQty, showCart, setShowCart }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStateContext = () => useContext(StoreContext);
