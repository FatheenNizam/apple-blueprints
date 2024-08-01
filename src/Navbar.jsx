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
        {siteContentData?.fields.menuItems?.map(({ fields: { title, url } }) => (
          <a key={title} href={url} aria-label={title}>
            {title}
          </a>
        ))}
        <a href="#" aria-label="Search">
          <span className="material-symbols-rounded">search</span>
        </a>
      </div>
    </nav>
  );
}
