import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { fetchProductDetail } from "../../redux/thunks/products";
import { Product } from "../../types/type";
import { cartActions } from "../../redux/slices/carts";

export default function ProductDetail() {
  const productDetail = useSelector(
    (state: RootState) => state.productDetail.productDetail
  );

  const dispatch = useDispatch<AppDispatch>();
  // result: object
  const result = useParams();
  const productId = result.id;

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [productId, dispatch]);

  function onClickHandler(item: Product) {
    dispatch(cartActions.addCartList(item));
  }

  if (!productDetail) {
    return <div> no data ...</div>;
  }
  return (
    <div>
      <h1>ProductDetail</h1>
      <p>{productDetail.title}</p>
      <p> {productDetail.price} $</p>
      <button onClick={() => onClickHandler(productDetail)}>Add to cart</button>
    </div>
  );
}
