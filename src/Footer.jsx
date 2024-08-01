import React, { useContext, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { SiteContentContext } from "./SiteContentContext";

export function Footer({ lastUpdated }) {
  const siteContentData = useContext(SiteContentContext);

  return (
    <div className="footer-wrapper">
      <div className="footer">
        <div id="footer-button-container">
          {siteContentData?.fields.footerItems?.map(({ fields: { text, icon, url } }) => (
            <a href={url} target="_blank" className="footer-button">
              <i className={icon}></i>&nbsp;&nbsp;{text}
            </a>
          ))}
        </div>

        {lastUpdated && <LastUpdated lastUpdated={lastUpdated} />}
      </div>
    </div>
  );
}

function LastUpdated({ lastUpdated }) {
  const [showRelativeTime, setShowRelativeTime] = useState(true);
  const relativeTime = formatDistanceToNow(lastUpdated, { addSuffix: true });
  const actualDate = format(new Date(lastUpdated), "MMMM d, yyyy, h:mm a");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };

  const siteContentData = useContext(SiteContentContext);

  return (
    <div className="footer-text-container">
      <div className="footer-text disclaimer-text">{siteContentData?.fields.footerText}</div>
      <div className="footer-text last-updated-text" onClick={handleClick} title="Click to toggle">
        Last updated{!showRelativeTime}{" "}
        <span className="last-updated-time">{showRelativeTime ? relativeTime : actualDate}</span>
      </div>
    </div>
  );
}
