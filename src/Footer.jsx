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

document.addEventListener("DOMContentLoaded", () => {
  const spaceId = "1zn4b0ow3sim";
  const accessToken = "xkzA96ThdMaC5DW91RubOhJhrMi8ZHPrxCCWZ7DbZek";
  const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}&content_type=siteContent`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      const footerText = data.items.map((item) => item.fields["contentText"]).join(" ");
      renderReactComponent(footerText);
    })
    .catch((error) => console.error("Error fetching data from Contentful:", error));

  function renderReactComponent(footerText) {
    ReactDOM.render(<LastUpdated lastUpdated={new Date()} footerText={footerText} />, document.getElementById("root"));
  }
});

function LastUpdated({ lastUpdated }) {
  const [showRelativeTime, setShowRelativeTime] = useState(true);
  const relativeTime = formatDistanceToNow(lastUpdated, { addSuffix: true }).replace("about ", "");
  const actualDate = format(new Date(lastUpdated), "MMMM d, yyyy, h:mm a");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };

  const footerText = "Page under construction. Information may be inaccurate.";

  return (
    <div className="footer-text-container">
      <div className="footer-text disclaimer-text">{footerText}</div>
      <div className="footer-text last-updated-text" onClick={handleClick} title="Click to toggle">
        Last updated: <span className="last-updated-time">{showRelativeTime ? relativeTime : actualDate}</span>
      </div>
    </div>
  );
}
