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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  const siteContentData = useContext(SiteContentContext);

  return (
    <div className="footer-text-container">
      <p className="footer-text disclaimer-text" aria-label="Footer text">
        {siteContentData?.fields.footerText}
      </p>
      <button className="footer-text last-updated-text" tabIndex="-1">
        Last updated{" "}
        <span
          className="last-updated-time"
          onClick={handleClick}
          onKeyDown={handleKeyPress}
          title="Click to toggle"
          role="button"
          aria-label="Toggle time format"
          tabIndex="0"
        >
          {showRelativeTime ? relativeTime : actualDate}
        </span>
      </button>
    </div>
  );
}
