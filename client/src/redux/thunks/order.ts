import axios from "axios";
import { orderActions } from "../slices/orders";
import { AppDispatch } from "../store";

export function fetchOrderData(userId: string) {
  const orderUrl = `http://localhost:8000/orders/${userId}`;
  return async (dispatch: AppDispatch) => {
    // axios or fetch
    const response = await axios(orderUrl);
    const orderList = await response.data;
    dispatch(orderActions.setOrderList(orderList));
  };
}
