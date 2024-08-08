import React from "react";
import { parse } from "date-fns";
import { ProductItem } from "./ProductItem";

export function MonthCard({ month, products, year, showMonths }) {
  if (month === "unknown" && products.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const monthDate = parse(`${month} ${year}`, "MMMM yyyy", new Date());

  const isCurrentMonth = monthDate.getFullYear() === currentYear && monthDate.getMonth() + 1 === currentMonth;

  return (
    <ul className="month-card" role="list">
      <li>
        <h3 className={`month-label ${isCurrentMonth ? "text-highlight" : ""}`}>{month}</h3>
      </li>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductItem key={product.sys.id} product={product} showMonths={showMonths} role="listitem" />
        ))}
      </div>
    </ul>
  );
}
