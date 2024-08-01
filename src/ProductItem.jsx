import React, { useState } from "react";
import { Link } from "react-router-dom";
import { productIcons } from "./productIcons";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";

export function ProductItem({ product }) {
  const updatedProduct = useContentfulLiveUpdates(product);
  const productLine = updatedProduct?.fields.productLine;
  const [isHovered, setIsHovered] = useState(false);

  const generation = updatedProduct.fields.generation;
  let displayGeneration = "";

  if (generation && generation > 0) {
    let suffix = "th";

    if (generation % 10 === 1 && generation % 100 !== 11) {
      suffix = "st";
    } else if (generation % 10 === 2 && generation % 100 !== 12) {
      suffix = "nd";
    } else if (generation % 10 === 3 && generation % 100 !== 13) {
      suffix = "rd";
    }

    displayGeneration = `(${generation}${suffix} generation)`;
  }

  const displayName = `${updatedProduct.fields.productName} ${
    updatedProduct.fields.spec ? `(${updatedProduct.fields.spec})` : displayGeneration
  }`;

  return (
    <Link
      to={"/product/" + updatedProduct.fields.slug}
      className={`${updatedProduct.fields.status}-product product-item ${productLine}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`material-symbols-rounded product-item-icon ${
          productLine === "MacBook" ||
          productLine === "MacBook Air" ||
          productLine === "MacBook Pro" ||
          productLine === "iMac" ||
          productLine === "Studio Display" ||
          productLine === "Apple Vision Pro" ||
          productLine === "Magic Keyboard for iPad Pro" ||
          productLine === "Apple Pencil" ||
          productLine === "AirTag"
            ? "material-symbols-rounded-no-fill"
            : ""
        }`}
      >
        {productIcons[productLine]}
      </span>
      <span
        className={`product-item-text ${isHovered ? "hovered-text" : ""}`}
        {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "productName" })}
      >
        {displayName}
      </span>
    </Link>
  );
}
