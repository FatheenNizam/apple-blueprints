import React, { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { YearCard } from "./YearCard";
import { ProductsDataContext } from "./ProductsDataContext";
import { transformProductsData } from "./transformProductsData";
import { fetchProductsData } from "./fetchProductsData";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function App() {
  const [productsData, setProductsData] = useState(null);
  const { productsByYear, unknownProducts, lastUpdated } = useMemo(
    () => (productsData ? transformProductsData(productsData) : {}),
    [productsData]
  );

  useEffect(() => {
    fetchProductsData().then((data) => setProductsData(data));
  }, []);

  const unknownMonths = useMemo(() => [{ products: unknownProducts }], [unknownProducts]);
  const currentYear = new Date().getFullYear();

  return (
    <div className="app">
      <Navbar />
      <div className="section">
        <div id="main-buttons-container">
          <div>
            <button className="main-button">
              <span className="material-symbols-rounded">expand_all</span> Show previous years
            </button>
          </div>
          <a href={`#${currentYear}`} style={{ textDecoration: "none" }}>
            {" "}
            <div>
              <button className="main-button">
                Jump to current year <span className="material-symbols-rounded">arrow_forward</span>
              </button>
            </div>
          </a>
        </div>
      </div>
      <ProductsDataContext.Provider value={productsData}>
        <div className="year-list section">
          {productsByYear &&
            productsByYear.map(({ yearName, months }) => <YearCard key={yearName} year={yearName} months={months} />)}
          {unknownProducts?.length > 0 && <YearCard key="unknown" year="unknown" months={unknownMonths} />}
        </div>
        <Footer lastUpdated={lastUpdated} />
        <Outlet />
      </ProductsDataContext.Provider>
    </div>
  );
}
