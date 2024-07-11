import React, { useEffect, useState } from "react";
import { fetchSiteContentData } from "./fetchSiteContentData";

export function Navbar() {
  const [siteContentData, setSiteContentData] = useState(null);

  useEffect(() => {
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  const currentYear = new Date().getFullYear();
  const siteTitle = siteContentData?.fields.siteTitle;

  return (
    <div id="navbar">
      <h1>
        <a title="Jump to current year" href={`#${currentYear}`}>
          {siteTitle}
        </a>
      </h1>
    </div>
  );
}
