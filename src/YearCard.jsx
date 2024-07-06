import React, { useEffect, useRef, useState } from "react";
import { MonthCard } from "./MonthCard";

export function YearCard({ months, year }) {
  const currentYear = new Date().getFullYear();
  const isPastYear = year < currentYear;

  const yearLabelRef = useRef(null);
  const [isScrollingProgrammatically, setIsScrollingProgrammatically] = useState(false);

  useEffect(() => {
    let lastTop = 0;
    let lastScrollPosition = 0;
    const navbar = document.querySelector("#navbar");
    const navbarTravel = navbar.clientHeight + 24;

    // Set navbar to visible initially
    navbar.style.transform = `translateY(0)`;

    const handleScroll = () => {
      if (!isScrollingProgrammatically) {
        const maxScrollPosition =
          Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          ) - window.innerHeight;

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
    if (year === currentYear) {
      const offset = -140; // Adjust this value as needed
      const element = yearLabelRef.current;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      setIsScrollingProgrammatically(true);
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "auto", // Ensure no scrolling animation
      });

      // Disable the programmatic scroll flag after a short delay to avoid conflicts
      setTimeout(() => {
        setIsScrollingProgrammatically(false);
      }, 100); // Adjust the delay as needed
    }
  }, [currentYear, year]);

  return (
    <div className="yearCard">
      <h2 ref={yearLabelRef} className={`year-label ${isPastYear ? "past-date" : ""}`}>
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
