import React, { useEffect, useRef, useState } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const yearLabelRef = useRef(null);
  const [isScrollingProgrammatically] = useState(false);
  const [showPastYears, setShowPastYears] = useState(false);

  useEffect(() => {
    let lastTop = 0;
    let lastScrollPosition = 0;
    const navbar = document.querySelector("#navbar");
    const navbarTravel = navbar.clientHeight + 100;

    // Set navbar to visible initially
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
        ? '<span class="material-symbols-rounded">expand_all</span> Show previous years'
        : '<span class="material-symbols-rounded">collapse_all</span> Hide previous years';
    };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, [showPastYears]);

  if (isPastYear && !showPastYears) {
    return null;
  }

  return (
    <div className="year-card">
      <h2 id={year} className={`year-label ${isPastYear ? "past-date" : ""}`}>
        {year}
      </h2>
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
