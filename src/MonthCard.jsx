import React from "react";
import { parse, isBefore, endOfMonth, startOfMonth } from "date-fns";
import { ProductItem } from "./ProductItem";

// Define the priority order as an array
const tagPriority = [
  "iphone",
  "macbook",
  "ipad",
  "airpods",
  "watch",
  "apple-tv",
  "mac",
  "imac",
  "homepod",
  "accessory",
];

export function MonthCard({ month, products, year, isPastYear }) {
  if (month === "unknown" && products.length === 0) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const monthDate = parse(`${month} ${year}`, "MMMM yyyy", new Date());

  const startCurrentMonth = startOfMonth(today);
  const endCurrentMonth = endOfMonth(today);

  const isPastMonth = isBefore(monthDate, startCurrentMonth) && year <= currentYear;
  const isCurrentMonth = monthDate.getFullYear() === currentYear && monthDate.getMonth() + 1 === currentMonth;

  // Sort products based on tag priority
  const sortedProducts = [...products].sort((a, b) => {
    const tagA = a.metadata.tags.length > 0 ? a.metadata.tags[0].sys.id : "";
    const tagB = b.metadata.tags.length > 0 ? b.metadata.tags[0].sys.id : "";

    // Get the index from the priority array, default to Infinity if not found
    const indexA = tagPriority.indexOf(tagA);
    const indexB = tagPriority.indexOf(tagB);

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

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
        {sortedProducts.map((product) => (
          <ProductItem key={product.sys.id} product={product} />
        ))}
      </div>
    </ul>
  );
}
