import React from "react";
import Card from "./Card";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          type={product.type}
          brand={product.brand} 
          specs={product.specs} 
          price={product.price} 
        />
      ))}
    </div>
  );
};

export default ProductList;
