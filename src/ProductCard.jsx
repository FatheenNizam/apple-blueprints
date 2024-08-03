import React, { useContext, useMemo, useState, useEffect } from "react";
import { statusLabels } from "./statusLabels";
import { statusIcons } from "./statusIcons";
import { ProductsDataContext } from "./ProductsDataContext";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { router } from "./router";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useFocusOnUpdate } from "./useFocusOnUpdate";

export function ProductContainer({ product, onDismiss }) {
  const { goToNextProduct, goToPreviousProduct, nextProductSlug, previousProductSlug } = useProductNavigation(product);
  const updatedProduct = useContentfulLiveUpdates(product);

  useEffect(() => {
    const handler = (event) => {
      switch (event.key) {
        case "Escape":
          onDismiss();
          break;
        case "ArrowLeft":
          goToPreviousProduct();
          break;
        case "ArrowRight":
          goToNextProduct();
          break;
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const productContainerRef = useFocusOnUpdate();

  const generation = updatedProduct.fields.generation;
  let displayGeneration = "";

  if (generation && generation > 1) {
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
    <div className="product-card-wrapper">
      <div className="button-container">
        <button
          className="product-navigation-button"
          onClick={goToPreviousProduct}
          style={{ visibility: previousProductSlug ? "visible" : "hidden" }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div
        className="product-card"
        ref={productContainerRef}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="product-title"
      >
        <button className="fa-solid fa-xmark close-button" onClick={onDismiss} aria-label="Close" />
        <div className="product-card-content">
          <div className="product-status-wrapper">
            <div
              className={"product-status " + updatedProduct.fields.status + "-product"}
              {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "status" })}
            >
              {/* <i className={`product-status-icon ${statusIcons[updatedProduct.fields.status]}`} /> */}
              <div className="product-status-text">
                {statusLabels[updatedProduct.fields.status]}{" "}
                {updatedProduct.fields.status === "announced"
                  ? (updatedProduct.fields.announcedDate
                      ? format(new Date(updatedProduct.fields.announcedDate), "MMM d, yyyy")
                      : "") +
                    (updatedProduct.fields.releasedDate
                      ? ` (Available ${format(new Date(updatedProduct.fields.releasedDate), "MMM d")})`
                      : "")
                  : updatedProduct.fields.status === "released" && updatedProduct.fields.releasedDate
                  ? format(new Date(updatedProduct.fields.releasedDate), "MMM d, yyyy")
                  : ""}
              </div>
            </div>
          </div>
          <div className="top-section">
            <div className="product-info">
              <div className="titlebar">
                <div
                  className="product-name"
                  id="product-title"
                  {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "productName" })}
                >
                  {updatedProduct.fields.productName}
                </div>
              </div>
              <div
                className="product-description"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "description" })}
              >
                {updatedProduct.fields.description}
              </div>
            </div>
            {updatedProduct.fields.images && (
              <div
                className="product-image-container"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "images" })}
              >
                {updatedProduct.fields.images.map((image) => (
                  <ProductImage key={image.sys.id} image={image} />
                ))}
              </div>
            )}
          </div>
          {updatedProduct.fields.features && (
            <div
              className="product-header"
              {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "features" })}
            >
              What's new:
              <ul className="product-features">
                {updatedProduct.fields.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <table>
            <tbody>
              <tr>
                <td>Rumored</td>
                <td>
                  {updatedProduct?.fields.rumoredDate ? formatToUTCTime(updatedProduct.fields.rumoredDate) : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Announced</td>
                <td>
                  {updatedProduct?.fields.announcedDate ? formatToUTCTime(updatedProduct.fields.announcedDate) : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Released</td>
                <td>
                  {updatedProduct?.fields.releasedDate ? formatToUTCTime(updatedProduct.fields.releasedDate) : "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
          {updatedProduct.fields.sources && (
            <div className="product-header sources-header">
              Sources:
              <ul
                className="product-sources"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "sources" })}
              >
                {updatedProduct.fields.sources.map((source) => (
                  <li key={source} className="source-link">
                    <a href={source.fields.url} target="_blank" className="source-link">
                      <span className="source-link-text">{source.fields.title}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square source-link-icon"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="product-card-last-updated-text">
            Last updated {format(new Date(updatedProduct?.sys.updatedAt), "MMMM d, yyyy, h:mm a")} (
            {formatDistanceToNow(new Date(updatedProduct?.sys.updatedAt))} ago)
          </div>

          <div>
            <a
              href={`mailto:appleblueprints@gmail.com?subject=Edit%20request:%20${updatedProduct.fields.productName}&body=Please%20provide%20details%20of%20the%20edit%20you%20would%20like%20to%20make.`}
              target="_blank"
              className="product-card-button"
              id="suggest-button"
            >
              <i className="fas fa-wrench"></i>&nbsp;&nbsp;Suggest edit
            </a>{" "}
          </div>
        </div>
      </div>
      <div className="button-container">
        <button
          className="product-navigation-button"
          onClick={goToNextProduct}
          style={{ visibility: nextProductSlug ? "visible" : "hidden" }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

function useProductNavigation(product) {
  const productsData = useContext(ProductsDataContext);
  const allProducts = productsData?.flatMap((year) => year.months.flatMap((month) => month.products));
  const productSlugs = allProducts.map((item) => item.fields.slug);

  const currentProductIndex = productSlugs.indexOf(product.fields.slug);
  const nextProductSlug = productSlugs[currentProductIndex + 1];
  const previousProductSlug = productSlugs[currentProductIndex - 1];

  const goToNextProduct = () => {
    if (nextProductSlug) {
      router.navigate(`/product/${nextProductSlug}`);
    }
  };

  const goToPreviousProduct = () => {
    if (previousProductSlug) {
      router.navigate(`/product/${previousProductSlug}`);
    }
  };

  return { goToNextProduct, goToPreviousProduct, nextProductSlug, previousProductSlug };
}

function ProductImage({ image }) {
  return (
    <>
      <img
        key={image.fields.file.url}
        className="product-image"
        width={Math.min(300, image.fields.file.details.image.width)}
        // height={image.height}
        style={{ aspectRatio: `${image.fields.file.details.image.width}/${image.fields.file.details.image.height}` }}
        src={image.fields.file.url + "?fm=webp&h=300"}
        srcSet={`${image.fields.file.url}?fm=webp&h=300 1x, ${image.fields.file.url}?fm=webp&h=600 2x, ${image.fields.file.url}?fm=webp&h=900 3x`}
        alt={`The ${image.fields.title} is shown.`}
      />
      <a className="product-image-source-link" href={image?.fields.description} target="_blank">
        <span className="source-link-text">View image source</span>
        <i className="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </>
  );
}

function formatToUTCTime(date) {
  return format(toZonedTime(parseISO(date.split("T")[0]), "UTC"), "MMMM d, yyyy");
}
