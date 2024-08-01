import React from "react";
import { parse, isBefore, startOfMonth } from "date-fns";
import { ProductItem } from "./ProductItem";
import { productLinePriority } from "./productLinePriority";

function parseProductName(name) {
  const match = name.match(/(\d+(\.\d+)?)-inch/);
  return match ? parseFloat(match[1]) : null;
}

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

  const sortedProducts = [...products].sort((a, b) => {
    const productLineA = a.fields.productLine || "";
    const productLineB = b.fields.productLine || "";

    const indexA = productLinePriority.indexOf(productLineA);
    const indexB = productLinePriority.indexOf(productLineB);

    if (indexA === indexB) {
      const nameA = a.fields.productName || "";
      const nameB = b.fields.productName || "";
      const alphaComparison = nameA.localeCompare(nameB);

      if (alphaComparison !== 0) {
        return alphaComparison;
      }

      const sizeA = parseProductName(nameA);
      const sizeB = parseProductName(nameB);

      if (sizeA !== null && sizeB !== null) {
        return sizeA - sizeB;
      }

      return 0;
    }

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
