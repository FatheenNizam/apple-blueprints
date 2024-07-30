import React, { useState } from "react";
import { Link } from "react-router-dom";
import { statusIcons } from "./statusIcons";
import { productIcons } from "./productIcons";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";

export function ProductItem({ product }) {
  const updatedProduct = useContentfulLiveUpdates(product);
  const tag = updatedProduct.metadata.tags.length > 0 ? updatedProduct.metadata.tags[0].sys.id : "";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={"/product/" + updatedProduct.fields.slug}
      className={`${updatedProduct.fields.status}-product product-item ${
        updatedProduct.metadata.tags.length > 0 ? updatedProduct.metadata.tags[0].sys.id : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`material-symbols-rounded product-item-icon ${
          updatedProduct.metadata.tags.length > 0 &&
          (updatedProduct.metadata.tags[0].sys.id === "mac" || updatedProduct.metadata.tags[0].sys.id === "vision")
            ? "material-symbols-rounded-no-fill"
            : ""
        } ${
          updatedProduct.metadata.tags.length > 0 && updatedProduct.metadata.tags[0].sys.id === "ipad"
            ? "material-symbols-rounded-rotate"
            : ""
        }`}
      >
        {productIcons[updatedProduct.metadata.tags.length > 0 ? updatedProduct.metadata.tags[0].sys.id : ""]}
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
