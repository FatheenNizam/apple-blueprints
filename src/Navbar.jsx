import React, { useContext } from "react";
import { SiteContentContext } from "./SiteContentContext";

export function Navbar() {
  const siteContentData = useContext(SiteContentContext);

  const currentYear = new Date().getFullYear();
  const siteTitle = siteContentData?.fields.siteTitle;

  return (
    <nav id="navbar">
      <div className="navbar-items-left">
        <h1>
          <a title="Jump to current year" href={`#${currentYear}`} aria-label="Jump to current year">
            {siteTitle}
          </a>
        </h1>
      </div>
      <div className="navbar-items-right">
        <a href="#" aria-label="Item 1">
          Item 1
        </a>
        <a href="#" aria-label="Item 2">
          Item 2
        </a>
        <a href="#" aria-label="Item 3">
          Item 3
        </a>
        <a href="#" aria-label="Item 4">
          Item 4
        </a>
        <a href="#" aria-label="Search">
          <span className="material-symbols-rounded">search</span>
        </a>
      </div>
    </nav>
  );
}
