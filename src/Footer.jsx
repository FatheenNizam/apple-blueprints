import React, { useState } from "react";
import moment from "moment";

export function Footer({ lastUpdated }) {
  const [showRelativeTime, setShowRelativeTime] = useState(true);
  const formattedDate = moment(lastUpdated);
  const relativeTime = formattedDate.fromNow();
  const actualDate = formattedDate.format("MMMM D, YYYY, h:mm A");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };

  const containerStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: "var(--underline)",
    textUnderlineOffset: "4px",
  };

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
      {lastUpdated && (
        <div id="footer-text">
          Page under construction. Information may be inaccurate.
          <div id="footer-text" onClick={handleClick} title="Click to toggle">
            Last updated: <span style={containerStyle}>{showRelativeTime ? relativeTime : actualDate}</span>
          </div>
        </div>
      )}
    </div>
  );
}
