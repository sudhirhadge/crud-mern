import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/products`,
          {
            headers: {
              Authorization: user ? `Bearer ${token}` : "",
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://crudappmern.vercel.app/api/test`,
          {
            headers: {
              Authorization: "",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!user && <h4> Login to see discounted prices</h4>}
      <div className="product-catalogue">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {product.discountedPrice && (
              <p>Discounted Price: ${product.discountedPrice}</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
