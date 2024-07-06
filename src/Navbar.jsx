import React, { useEffect, useState } from "react";
import { fetchSiteContentData } from "./fetchSiteContentData";

export function Navbar() {
  const [siteContentData, setSiteContentData] = useState(null);

  useEffect(() => {
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  return (
    <div id="navbar">
      <h1>{siteContentData?.fields.siteTitle}</h1>
    </div>
  );
}
