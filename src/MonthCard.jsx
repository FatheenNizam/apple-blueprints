import React from "react";
import { parse, isBefore, startOfMonth } from "date-fns";
import { ProductItem } from "./ProductItem";

export function MonthCard({ month, products, year, isPastYear }) {
  if (month === "unknown" && products.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const monthDate = parse(`${month} ${year}`, "MMMM yyyy", new Date());

  const startCurrentMonth = startOfMonth(today);
  const isPastMonth = isBefore(monthDate, startCurrentMonth) && year <= currentYear;
  const isCurrentMonth = monthDate.getFullYear() === currentYear && monthDate.getMonth() + 1 === currentMonth;

  return (
    <ul className="month-card">
      <h3
        className={`month-label ${isPastYear || isPastMonth ? "past-date" : ""} ${
          isCurrentMonth ? "current-month" : ""
        }`}
      >
        {month}
      </h3>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductItem key={product.sys.id} product={product} />
        ))}
      </div>
    </ul>
  );
}
