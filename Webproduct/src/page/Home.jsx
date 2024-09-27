import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../Component/Header";
import Search from "../Component/Search";
import ProductList from "../Component/ProductList"; // นำเข้า ProductList
import ProductService from "../services/product.service"; 
import Swal from "sweetalert2";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        if (response.status === 200) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error Fetching Products",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <Header />
      <Search
        products={products} 
        // setFilteredProducts={setFilteredProducts} 
      />
      <ProductList products={filteredProducts} /> {/* ใช้ ProductList แทน Product */}
    </div>
  );
}

export default Home;
