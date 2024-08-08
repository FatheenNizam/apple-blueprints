import React, { useState } from "react";
import { Link } from "react-router-dom";
import { productIcons, noFillProductLines } from "./productIcons";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";

export function ProductItem({ product, showMonths }) {
  const updatedProduct = useContentfulLiveUpdates(product);
  const productLine = updatedProduct?.fields.productLine;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={"/product/" + updatedProduct.fields.slug}
      tabIndex={showMonths ? "0" : "-1"}
      className={`${updatedProduct.fields.status}-product product-item ${productLine}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`material-symbols-rounded product-item-icon ${
          noFillProductLines.has(productLine) ? "material-symbols-rounded-no-fill" : ""
        }`}
      >
        {productIcons[productLine]}
      </span>
      <span
        className={`product-item-text ${isHovered ? "hovered-text" : ""}`}
        {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "productName" })}
      >
        {updatedProduct.fields.productName}
      </span>
    </Link>
  );
}
