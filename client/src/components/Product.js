import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./context/AuthContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/products`, {
          method: "GET",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user]);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch("https://crudappmern.vercel.app/api/test", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch test API");
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching test API:", error);
      }
    };

    fetchTest();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!user && <h4>Login to see discounted prices</h4>}
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
