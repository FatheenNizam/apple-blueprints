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
  };

  return (
    <div
      id="last-updated"
      onClick={handleClick}
      style={containerStyle}
      title={showRelativeTime ? actualDate : "Click to toggle"}
    >
      {showRelativeTime ? `Last updated: ${relativeTime}` : `Last updated: ${actualDate}`}
    </div>
  );
}
