import React from "react";
import { format, parse, isBefore, endOfMonth, startOfMonth } from "date-fns";
import { ProductItem } from "./ProductItem";

export function MonthCard({ month, products, year, isPastYear }) {
  if (month === "unknown" && products.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth returns 0-based index

  // Parse the month string to a Date object with the current year
  const monthDate = parse(`${month} ${year}`, "MMMM yyyy", new Date());

  // Calculate start and end of current month
  const startCurrentMonth = startOfMonth(today);
  const endCurrentMonth = endOfMonth(today);

  // Check if the monthDate is before the start of current month and year <= currentYear
  const isPastMonth = isBefore(monthDate, startCurrentMonth) && year <= currentYear;

  return (
    <ul className="month-card">
      <h3 className={`month-label ${isPastYear || isPastMonth ? "past-date" : ""}`}>{month}</h3>
      <div className="product-list-container">
        {products.map((product) => (
          <ProductItem key={product.sys.id} product={product} />
        ))}
      </div>
    </ul>
  );
}
