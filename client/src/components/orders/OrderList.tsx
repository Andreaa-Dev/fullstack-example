import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

import ProductOrderList from "./ProductOrderList";
import { fetchOrderData } from "../../redux/thunks/order";

export default function OrderList() {
  // fetch order list by userId
  // userId from redux
  // token
  const orderList = useSelector((state: RootState) => state.order.orderList);
  const userDetail = useSelector(
    (state: RootState) => state.users.userInformation
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userDetail) {
      dispatch(fetchOrderData(userDetail._id));
    }
  }, []);
  console.log(orderList, "order");
  return (
    <div>
      <h1>OrderList </h1>
      {orderList.map((item) => (
        <div>
          <div> {new Date(item.createdAt).toLocaleDateString()}</div>
          <div>
            {item.productList.map((product) => (
              <ProductOrderList product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
