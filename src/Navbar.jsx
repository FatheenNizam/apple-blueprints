import React, { useEffect, useState } from "react";
import { fetchSiteContentData } from "./fetchSiteContentData";

export function Navbar() {
  const [siteContentData, setSiteContentData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  const currentYear = new Date().getFullYear();
  const siteTitle = siteContentData?.fields.siteTitle;

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to perform search
  const performSearch = () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
    } else {
      // Example: Assuming siteContentData contains an array of items to search through
      const results = siteContentData?.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div id="navbar">
      <div className="navbar-items">
        <h1>
          <a title="Jump to current year" href={`#${currentYear}`}>
            {siteTitle}
          </a>
        </h1>
        <div>
          {/* <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
          <button onClick={performSearch}>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button> */}
        </div>
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id}>{result.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
