import React, { useEffect, useState, useRef } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const [showMonths, setShowMonths] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const yearLabelRef = useRef(null);
  const yearLabelTextRef = useRef(null);

  const handleYearClick = () => {
    if (showMonths) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    setShowMonths((prevShowMonths) => !prevShowMonths);
  };

  useEffect(() => {
    if (!showMonths) {
      const yearLabelElement = yearLabelRef.current;
      yearLabelElement.style.position = "static";
      yearLabelElement.style.borderColor = "transparent";
      yearLabelElement.style.backdropFilter = "";
      yearLabelElement.style.webkitBackdropFilter = "";
      return;
    } else {
      yearLabelRef.current.style.position = "sticky";
    }

    const handleScroll = () => {
      const yearLabelElement = yearLabelRef.current;
      const rootElement = document.documentElement;
      const computedStyle = getComputedStyle(rootElement);
      const blurValue = computedStyle.getPropertyValue("--blur-value").trim();

      const isSticky =
        yearLabelElement.getBoundingClientRect().top <=
        parseInt(getComputedStyle(yearLabelElement).getPropertyValue("top"));

      if (isSticky) {
        yearLabelElement.style.backdropFilter = `saturate(200%) blur(${blurValue})`;
        yearLabelElement.style.webkitBackdropFilter = `saturate(200%) blur(${blurValue})`;
        yearLabelElement.style.borderColor = "var(--border)";
        yearLabelElement.style.alignSelf = "inherit";
      } else {
        yearLabelElement.style.backdropFilter = "";
        yearLabelElement.style.webkitBackdropFilter = "";
        yearLabelElement.style.borderColor = "transparent";
        yearLabelElement.style.alignSelf = "flex-start";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMonths]);

  return (
    <div className="year-card">
      <button
        ref={yearLabelRef}
        id={year}
        className="year-label-wrapper"
        aria-expanded={showMonths}
        aria-controls={`months-${year}`}
        aria-label={`Toggle months for ${year}`}
        onClick={handleYearClick}
      >
        <h2 ref={yearLabelTextRef} className={`year-label-text ${isPastYear ? "" : "text-highlight"} `}>
          {year}&nbsp;&nbsp;
        </h2>
        <i
          className={`${isPastYear ? "" : "text-highlight"} year-label-arrow ${
            showMonths ? "rotate-90 minimize" : ""
          } fa-solid fa-chevron-right`}
        ></i>
      </button>
      <div className={`month-card-container ${showMonths ? "expanded" : "collapsed"} ${isHidden ? "hidden" : ""}`}>
        {months.map(({ name, products }) => (
          <MonthCard key={name ?? "unknown"} month={name} products={products} year={year} showMonths={showMonths} />
        ))}
      </div>
    </div>
  );
}
