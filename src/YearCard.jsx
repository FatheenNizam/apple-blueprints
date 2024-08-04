import React, { useEffect, useState } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const [isScrollingProgrammatically] = useState(false);
  const [showPastYears, setShowPastYears] = useState(false);
  const [showMonths, setShowMonths] = useState(true); // New state to track month visibility

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

  useEffect(() => {
    const button = document.querySelector(".main-button");

    const handleClick = () => {
      setShowPastYears((prevState) => !prevState);
      button.innerHTML = showPastYears
        ? '<span class="material-symbols-rounded">expand_all</span> Show past years'
        : '<span class="material-symbols-rounded">collapse_all</span> Hide past years';
    };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, [showPastYears]);

  if (isPastYear && !showPastYears) {
    return null;
  }

  const handleYearClick = () => {
    setShowMonths((prevShowMonths) => !prevShowMonths);
  };

  return (
    <div className="year-card">
      <h2 id={year} className={`year-label ${isPastYear ? "past-date" : ""}`} onClick={handleYearClick}>
        {year}
        <span className="material-symbols-rounded year-list-arrow">
          {showMonths ? "keyboard_arrow_down" : "keyboard_arrow_right"}
        </span>
      </h2>
      {showMonths && (
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
      )}
    </div>
  );
}
