import React, { useContext } from "react";
import { SiteContentContext } from "./SiteContentContext";

export function Navbar() {
  const siteContentData = useContext(SiteContentContext);

  return (
    <nav id="navbar" className="section" role="navigation" aria-label="Main navigation">
      <h1>
        <a
          id="site-title"
          href="#top"
          aria-current="page"
          aria-label="Jump to top of the page"
          title="Scroll to the top of the page"
        >
          {siteContentData?.fields.siteTitle}
        </a>
      </h1>
      <div className="navbar-menu-items">
        {siteContentData?.fields.menuItems?.map((item) => {
          const { fields: { title, url } = {} } = item || {};

          return title ? (
            <a className="menu-link" key={title} href={url || "#"} aria-label={title}>
              {title}
            </a>
          ) : null;
        })}

        <a id="search-icon" href="#" aria-label="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
      </div>
    </nav>
  );
}
