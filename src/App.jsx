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
          <div className="section"></div>
          <div className="section year-list">
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
