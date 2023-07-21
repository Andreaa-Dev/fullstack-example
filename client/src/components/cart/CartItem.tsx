import React from "react";
import { ProductOrder } from "../../types/type";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/carts";

type Prop = {
  item: ProductOrder;
};
export default function CartItem({ item }: Prop) {
  const dispatch = useDispatch();

  function increaseQuantityHandler() {
    dispatch(cartActions.increaseQuantity(item));
  }

  function decreaseQuantityHandler() {
    dispatch(cartActions.decreaseQuantity(item));
  }
  return (
    <div className="cartItem">
      <p> {item.title}</p>
      <p>{item.price} €</p>
      <button onClick={increaseQuantityHandler}>+</button>
      <p>{item.quantity}</p>
      <button onClick={decreaseQuantityHandler}>-</button>
    </div>
  );
}
