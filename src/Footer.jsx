import React, { useContext, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { SiteContentContext } from "./SiteContentContext";

export function Footer({ lastUpdated }) {
  const siteContentData = useContext(SiteContentContext);

  return (
    <div id="footer-wrapper">
      <div id="footer">
        <nav id="footer-button-container" aria-label="Footer navigation">
          {siteContentData?.fields.footerItems?.map((item, index) => {
            const { fields: { text, icon, url } = {} } = item || {};

            return text && icon && url ? (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-button"
                aria-label={`${text} (opens in a new tab)`}
              >
                <i className={icon}></i>&nbsp;&nbsp;{text}
              </a>
            ) : null;
          })}
        </nav>

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
      <p className="footer-text disclaimer-text" aria-label="Footer text">
        {siteContentData?.fields.footerText}
      </p>
      <button
        className="footer-text last-updated-text"
        onClick={handleClick}
        title="Click to toggle"
        aria-expanded={showRelativeTime}
        aria-controls="last-updated-time"
      >
        Last updated{!showRelativeTime}{" "}
        <span id="last-updated-time" className="last-updated-time">
          {showRelativeTime ? relativeTime : actualDate}
        </span>
      </button>
    </div>
  );
}
