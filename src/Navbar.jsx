import React, { useContext } from "react";
import { SiteContentContext } from "./SiteContentContext";

export function Navbar() {
  const siteContentData = useContext(SiteContentContext);

  const currentYear = new Date().getFullYear();
  const siteTitle = siteContentData?.fields.siteTitle;

  return (
    <nav id="navbar" className="section" role="navigation" aria-label="Main navigation">
      <h1>
        <a
          id="site-title"
          href={`#${currentYear}`}
          aria-current="page"
          aria-label={`Jump to current year: ${currentYear}`}
        >
          {siteTitle}
        </a>
      </h1>
      <div className="navbar-menu-items">
        {siteContentData?.fields.menuItems?.map((item) => {
          const { fields: { title, url } = {} } = item || {};

          return title ? (
            <a key={title} href={url || "#"} aria-label={title}>
              {title}
            </a>
          ) : null;
        })}

        <a href="#" aria-label="Search">
          <span className="material-symbols-rounded" aria-hidden="true">
            search
          </span>
        </a>
      </div>
    </nav>
  );
}
