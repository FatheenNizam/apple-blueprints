import React, { useEffect, useState } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const [showMonths, setShowMonths] = useState(true);

  const handleYearClick = () => {
    setShowMonths((prevShowMonths) => !prevShowMonths);
  };

  return (
    <div className="year-card">
      <button
        id={year}
        className="year-label-wrapper"
        onClick={handleYearClick}
        tabIndex="0"
        aria-expanded={showMonths}
        aria-controls={`months-${year}`}
        aria-label={`Toggle months for ${year}`}
      >
        <h2 className={`year-label ${isPastYear ? "" : "text-highlight"}`}>{year}&nbsp;&nbsp;</h2>
        <i
          className={`${isPastYear ? "" : "text-highlight"} year-label-arrow ${
            showMonths ? "rotate-90" : ""
          } fa-solid fa-chevron-right`}
        ></i>
      </button>
      <div id={`months-${year}`} className={`month-card-container ${showMonths ? "expanded" : "collapsed"}`}>
        {months.map(({ name, products }) => (
          <MonthCard key={name ?? "unknown"} month={name} products={products} year={year} isPastYear={isPastYear} />
        ))}
      </div>
    </div>
  );
}
