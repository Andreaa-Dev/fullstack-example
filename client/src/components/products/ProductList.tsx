import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchProductData } from "../../redux/thunks/products";
import { Link } from "react-router-dom";

export default function ProductList() {
  const productList = useSelector(
    (state: RootState) => state.products.products
  );
  console.log(productList, "products");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  return (
    <div>
      <h1 className="productTitle">Product List</h1>
      {productList.map((product) => {
        return (
          <div key={product._id}>
            <p>{product.title}</p>
            <Link to={`${product._id}`}>
              <button> More detail</button>
            </Link>
            <img
              // src={`http://localhost:8000/static/${product.image}`}
              src={product.image}
              alt={product.title}
              height="50px"
              width="50px"
            />
          </div>
        );
      })}
    </div>
  );
}
