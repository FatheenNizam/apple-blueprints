import React, { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";

export function Footer({ lastUpdated }) {
  return (
    <div id="footer">
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
  );
}

const footerText = "Yo";

function LastUpdated({ lastUpdated }) {
  console.log(lastUpdated);
  const [showRelativeTime, setShowRelativeTime] = useState(true);
  const relativeTime = formatDistanceToNow(lastUpdated, { addSuffix: true }).replace("about ", "");
  const actualDate = format(new Date(lastUpdated), "MMMM d, yyyy, h:mm a");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };

  return (
    <div className="footer-text-container">
      <div className="footer-text">{}Page under construction. Information may be inaccurate.</div>
      <div className="footer-text last-updated-text" onClick={handleClick} title="Click to toggle">
        Last updated: <span className="last-updated-time">{showRelativeTime ? relativeTime : actualDate}</span>
      </div>
    </div>
  );
}
