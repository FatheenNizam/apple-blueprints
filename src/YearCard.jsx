import React from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear; // Check if year is less than currentYear

  return (
    <div className="yearCard">
      <h2 className={`year-label ${isPastYear ? "past-date" : ""}`}>{year}</h2>
      <div className="container">
        {months.map(({ name, products }) => (
          <MonthCard
            key={name ?? "unknown"}
            month={name}
            products={products}
            year={year}
            isPastYear={isPastYear} // Pass isPastYear to MonthCard
          />
        ))}
      </div>
    </div>
  );
}
