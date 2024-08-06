import React, { useEffect, useState } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const [isScrollingProgrammatically] = useState(false);
  const [showMonths, setShowMonths] = useState(true);
  useEffect(() => {
    let lastTop = 0;
    let lastScrollPosition = 0;
    const navbar = document.querySelector("#navbar");
    const navbarTravel = navbar.clientHeight + 100;

    navbar.style.transform = `translateY(0)`;

    const handleScroll = () => {
      if (!isScrollingProgrammatically) {
        const scrollPosition = window.pageYOffset;
        const delta = scrollPosition - lastScrollPosition;
        const newTop = scrollPosition <= 0 ? 0 : Math.max(0, Math.min(navbarTravel, lastTop + delta));

        navbar.style.transform = `translateY(-${newTop}px)`;

        lastTop = newTop;
        lastScrollPosition = scrollPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollingProgrammatically]);

  const handleYearClick = () => {
    setShowMonths((prevShowMonths) => !prevShowMonths);
  };

  return (
    <div className="year-card">
      <button
        id={year}
        className=" year-label-wrapper"
        onClick={handleYearClick}
        tabIndex="0"
        aria-expanded={showMonths}
        aria-controls={`months-${year}`}
        aria-label={`Toggle months for ${year}`}
      >
        <h2 className={`year-label ${isPastYear ? "" : "text-highlight"}`}>{year}&nbsp;</h2>
        <i
          className={`${isPastYear ? "" : "text-highlight"} ${
            showMonths ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"
          } year-label-arrow`}
        ></i>
      </button>
      {showMonths && (
        <div id={`months-${year}`} className="month-card-container">
          {months.map(({ name, products }) => (
            <MonthCard key={name ?? "unknown"} month={name} products={products} year={year} isPastYear={isPastYear} />
          ))}
        </div>
      )}
    </div>
  );
}
