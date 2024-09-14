import React, { useContext, useEffect, useState, useRef } from "react";
import { SiteContentContext } from "./SiteContentContext";


export function Navbar() {
  const siteContentData = useContext(SiteContentContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownVisible((prevState) => {
      return !prevState;
    });
  };

  const navbarRef = useRef(null);

  // useEffect(() => {
  //   let lastTop = 0;
  //   let lastScrollPosition = 0;
  //   const navbar = navbarRef.current;

  //   const updateNavbar = () => {
  //     const navbarTravel = navbar.clientHeight + 50;
  //     const totalHeight = Math.max(
  //       document.body.scrollHeight,
  //       document.body.offsetHeight,
  //       document.body.clientHeight,
  //       document.documentElement.scrollHeight,
  //       document.documentElement.offsetHeight,
  //       document.documentElement.clientHeight
  //     );
  //     const scrollPosition = Math.min(window.scrollY, totalHeight - window.innerHeight);
  //     const delta = scrollPosition - lastScrollPosition;
  //     const top = scrollPosition <= 0 ? 0 : Math.max(0, Math.min(navbarTravel, lastTop + delta));

  //     navbar.style.transform = `translateY(${-top}px)`;

  //     lastTop = top;
  //     lastScrollPosition = scrollPosition;
  //   };

  //   updateNavbar();

  //   window.addEventListener("scroll", updateNavbar);

  //   return () => {
  //     window.removeEventListener("scroll", updateNavbar);
  //   };
  // }, []);

  return (
    <>
  
      <nav ref={navbarRef} id="navbar" className="section" role="navigation" aria-label="Main navigation">
        
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
        <div className="navbar-menu-items-container">
          {siteContentData?.fields.menuItems?.map((item) => {
            const { fields: { title, url } = {} } = item || {};

            return title ? (
              <a className="navbar-menu-item" key={title} href={url || "#"} aria-label={title}>
                {title}
              </a>
            ) : null;
          })}
          {/* <a id="search-icon" className="navbar-menu-item" href="#" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </a> */}
          <a id="mobile-menu-icon" className="navbar-menu-item" href="#" aria-label="Menu" onClick={toggleDropdown}>
            <i className={`fa-solid ${isDropdownVisible ? "fa-close" : "fa-bars"}`}></i>
          </a>
        </div>
      </nav>
      <div className="navbar-cover"></div>
      <div id="mobile-dropdown-menu" className={"section mobile-dropdown " + (isDropdownVisible ? "visible" : "")}>
        {siteContentData?.fields.menuItems?.map((item) => {
          const { fields: { title, url } = {} } = item || {};

          return title ? (
            <a className="mobile-dropdown-menu-item" key={title} href={url || "#"} aria-label={title}>
              {title}
            </a>
          ) : null;
        })}
      </div>
    </>
  );
}
