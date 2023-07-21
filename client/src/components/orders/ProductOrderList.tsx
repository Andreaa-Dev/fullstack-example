import React from "react";
import { ProductOrder } from "../../types/type";

type Prop = {
  product: ProductOrder;
};
export default function ProductOrderList({ product }: Prop) {
  return (
    <div>
      <p>{product.title}</p>
      <p>{product.quantity}</p>
    </div>
  );
}
