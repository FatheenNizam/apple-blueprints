import React, { useContext, useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";
import { SiteContentContext } from "./SiteContentContext";

export function Navbar() {
  const siteContentData = useContext(SiteContentContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const dropdown = document.querySelector(".mobile-dropdown");
    if (dropdown) {
      if (isDropdownVisible) {
        dropdown.classList.add("visible");
        document.body.classList.add("no-scroll");
      } else {
        dropdown.classList.remove("visible");
        document.body.classList.remove("no-scroll");
      }
    }
  }, [isDropdownVisible]);

  return (
    <>
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
        <div className="menu-items-container">
          {siteContentData?.fields.menuItems?.map((item) => {
            const { fields: { title, url } = {} } = item || {};

            return title ? (
              <a className="menu-item" key={title} href={url || "#"} aria-label={title}>
                {title}
              </a>
            ) : null;
          })}
          <a id="search-icon" className="menu-item" href="#" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a>
          <a id="mobile-menu-icon" className="menu-item" href="#" aria-label="Menu" onClick={toggleDropdown}>
            <i className={`fa-solid ${isDropdownVisible ? "fa-close" : "fa-bars"}`}></i>
          </a>
        </div>
      </nav>
      {isDropdownVisible && (
        <FocusTrap>
          <div id="mobile-dropdown-menu" className="mobile-dropdown">
            <a
              id="mobile-dropdown-close-button"
              className="mobile-dropdown-menu-item"
              href="#"
              aria-label="Close menu"
              onClick={toggleDropdown}
            >
              <i className="fa-solid fa-close"></i>
            </a>
            {siteContentData?.fields.menuItems?.map((item) => {
              const { fields: { title, url } = {} } = item || {};

              return title ? (
                <a className="mobile-dropdown-menu-item" key={title} href={url || "#"} aria-label={title}>
                  {title}
                </a>
              ) : null;
            })}
          </div>
        </FocusTrap>
      )}
    </>
  );
}
