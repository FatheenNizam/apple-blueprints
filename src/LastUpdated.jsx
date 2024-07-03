import React, { useState } from "react";
import moment from "moment";

export function LastUpdated({ lastUpdated }) {
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
    textDecorationDolor: "var(--underline)",
    textUnderlineOffset: "4px",
  };

  return (
    <div id="footer-text">
      Page under construction. Information may be inaccurate.
      <div id="footer-text" onClick={handleClick} style={containerStyle} title="Click to toggle">
        {showRelativeTime ? `Last updated: ${relativeTime}` : `Last updated: ${actualDate}`}
      </div>
    </div>
  );
}
