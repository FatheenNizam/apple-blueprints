import React, { useEffect, useState } from "react";
import { fetchSiteContentData } from "./fetchSiteContentData";

export function Navbar() {
  const [siteContentData, setSiteContentData] = useState(null);

  useEffect(() => {
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  useEffect(() => {
    let lastTop = 0;
    let lastScrollPosition = 0;
    const navbar = document.querySelector("#navbar");
    const navbarTravel = navbar.clientHeight + 26;

    const handleScroll = () => {
      // Credit: Neil Philip Whitehead https://stackoverflow.com/a/17698713
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
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="navbar">
      <h1>{siteContentData?.fields.siteTitle}</h1>
    </div>
  );
}
