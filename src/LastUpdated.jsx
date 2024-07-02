import React from "react";
import moment from "moment";

export function LastUpdated({ lastUpdated }) {
  const relativeTime = moment(lastUpdated).fromNow();
  const actualDate = moment(lastUpdated).format("MMMM D, YYYY, h:mm A");

  return (
    <div title={actualDate} id="last-updated">
      Last updated: {relativeTime}
    </div>
  );
}
