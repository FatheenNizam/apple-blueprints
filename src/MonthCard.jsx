import React from "react";
import { ProductItem } from "./ProductItem";

export function MonthCard({ month, products, isPastYear }) {
  if (month === "unknown" && products.length === 0) {
    return null;
  }

  return (
    <ul className="month-card">
      <h3 className={`month-label ${isPastYear ? "past-date" : ""}`}>{month}</h3>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductItem key={product.sys.id} product={product} />
        ))}
      </div>
    </ul>
  );
}
