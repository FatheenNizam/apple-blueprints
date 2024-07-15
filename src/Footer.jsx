import React, { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { fetchSiteContentData } from "./fetchSiteContentData";

export function Footer({ lastUpdated }) {
  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div id="footer-button-container">
          <a
            href="mailto:appleblueprints@gmail.com?subject=Edit request: [Product name]&body=What would you like to change?"
            target="_blank"
            className="footer-button"
            id="suggest-button"
          >
            <i className="fas fa-wrench"></i>&nbsp;&nbsp;Suggest edit
          </a>
          <a href="https://www.x.com/appleblueprints" target="_blank" className="footer-button" id="twitter-button">
            <i className="fab fa-x-twitter"></i>&nbsp;&nbsp;Follow
          </a>
          <a
            href="https://www.buymeacoffee.com/appleblueprints"
            target="_blank"
            className="footer-button"
            id="donate-button"
          >
            <i className="far fa-grin"></i>&nbsp;&nbsp;Donate
          </a>
        </div>

        {lastUpdated && <LastUpdated lastUpdated={lastUpdated} />}
      </div>
    </div>
  );
}

function LastUpdated({ lastUpdated }) {
  const [showRelativeTime, setShowRelativeTime] = useState(true);
  const relativeTime = formatDistanceToNow(lastUpdated, { addSuffix: true }).replace("about ", "");
  const actualDate = format(new Date(lastUpdated), "MMMM d, yyyy, h:mm a");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };

  const [siteContentData, setSiteContentData] = useState(null);

  useEffect(() => {
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  console.log({ siteContentData });

  return (
    <div className="footer-text-container">
      <div className="footer-text disclaimer-text">{siteContentData?.fields.footerText}</div>
      <div className="footer-text last-updated-text" onClick={handleClick} title="Click to toggle">
        Last updated{!showRelativeTime && ":"}{" "}
        <span className="last-updated-time">{showRelativeTime ? relativeTime : actualDate}</span>
      </div>
    </div>
  );
}
