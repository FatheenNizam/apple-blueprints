import React, { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { YearCard } from "./YearCard";
import { ProductsDataContext } from "./ProductsDataContext";
import { transformProductsData } from "./transformProductsData";
import { fetchProductsData } from "./fetchProductsData";
import { fetchSiteContentData } from "./fetchSiteContentData";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SiteContentContext } from "./SiteContentContext";

export function App() {
  const [productsData, setProductsData] = useState(null);
  const [siteContentData, setSiteContentData] = useState(null);
  const { productsByYear, unknownProducts, lastUpdated } = useMemo(
    () => (productsData ? transformProductsData(productsData) : {}),
    [productsData]
  );

  useEffect(() => {
    fetchProductsData().then((data) => setProductsData(data));
    fetchSiteContentData().then((data) => setSiteContentData(data));
  }, []);

  const unknownMonths = useMemo(() => [{ products: unknownProducts }], [unknownProducts]);
  const currentYear = new Date().getFullYear();

  return (
    <ProductsDataContext.Provider value={productsByYear}>
      <SiteContentContext.Provider value={siteContentData}>
        <div className="app">
          <Navbar />
          <div className="section">
            <div id="main-buttons-container">
              <button className="main-button">
                <span className="material-symbols-rounded">expand_all</span> Show past years
              </button>
              <a href={`#${currentYear}`} style={{ textDecoration: "none" }} className="main-button">
                Jump to current year <span className="material-symbols-rounded">arrow_forward</span>
              </a>
            </div>
          </div>
          <div className="year-list section">
            {productsByYear &&
              productsByYear.map(({ yearName, months }) => <YearCard key={yearName} year={yearName} months={months} />)}
            {unknownProducts?.length > 0 && <YearCard key="unknown" year="unknown" months={unknownMonths} />}
          </div>
          <Footer lastUpdated={lastUpdated} />
          <Outlet />
        </div>
      </SiteContentContext.Provider>
    </ProductsDataContext.Provider>
  );
}
