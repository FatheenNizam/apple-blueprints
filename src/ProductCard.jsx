import React, { useContext, useMemo, useState, useEffect } from "react";
import { statusLabels } from "./statusLabels";
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

  const [showRelativeTime, setShowRelativeTime] = useState(true);

  const relativeTime = formatDistanceToNow(new Date(updatedProduct?.sys.updatedAt), { addSuffix: true });
  const actualDate = format(new Date(updatedProduct?.sys.updatedAt), "MMMM d, yyyy, h:mm a");

  const handleClick = () => {
    setShowRelativeTime(!showRelativeTime);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  const focusRef = useFocusOnUpdate();

  return (
    <div ref={focusRef} tabIndex="0" className="product-card-container">
      <div className="product-card-wrapper">
        <div id="previous-button" className="button-container">
          <button
            className="product-navigation-button"
            onClick={goToPreviousProduct}
            style={{ visibility: previousProductSlug ? "visible" : "hidden" }}
            aria-label="Previous product"
            disabled={!previousProductSlug}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <div id="next-button" className="button-container">
          <button
            className="product-navigation-button"
            onClick={goToNextProduct}
            style={{ visibility: nextProductSlug ? "visible" : "hidden" }}
            aria-label="Next product"
            disabled={!nextProductSlug}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="product-card" role="dialog" aria-labelledby="product-title" aria-modal="true">
          <div className="top-buttons-container">
            <div className="mobile-navigation-buttons-container mobile-navigation">
              <button
                className="fa-solid fa-chevron-left mobile-navigation-button"
                onClick={goToPreviousProduct}
                disabled={!previousProductSlug}
                aria-label="Previous product"
              />
              <button
                className="fa-solid fa-chevron-right mobile-navigation-button"
                onClick={goToNextProduct}
                disabled={!nextProductSlug}
                aria-label="Next product"
              />
            </div>
            <button className="fa-solid fa-xmark close-button" onClick={onDismiss} aria-label="Close" />
          </div>
          <div className="product-card-content">
            <div className="product-status-label-wrapper">
              <div
                className={`product-status-label ${updatedProduct.fields.status}-product`}
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "status" })}
              >
                <div className="product-status-label-text">
                  {statusLabels[updatedProduct.fields.status]}{" "}
                  {updatedProduct.fields.status === "rumored" && updatedProduct.fields.announcedDate
                    ? ` for ${format(new Date(updatedProduct.fields.announcedDate), "MMM d, yyyy")}`
                    : updatedProduct.fields.status === "announced"
                    ? (updatedProduct.fields.announcedDate
                        ? format(new Date(updatedProduct.fields.announcedDate), "MMM d, yyyy")
                        : "") +
                      (updatedProduct.fields.releasedDate
                        ? ` (Releases ${format(new Date(updatedProduct.fields.releasedDate), "MMM d")})`
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
                  <h3
                    className="product-name"
                    id="product-title"
                    {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "productName" })}
                  >
                    {updatedProduct.fields.productName}
                  </h3>
                </div>
                <p
                  className="product-description"
                  {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "description" })}
                >
                  {updatedProduct.fields.description}
                </p>
              </div>
              {updatedProduct.fields.images && (
                <div
                  className="product-image-container"
                  {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "images" })}
                >
                  {updatedProduct.fields.images.map((image) => (
                    <ProductImage key={image.sys.id} image={image} product={product} />
                  ))}
                </div>
              )}
            </div>
            {updatedProduct.fields.features && (
              <div
                className="product-header"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "features" })}
              >
                <h4>What's new:</h4>
                <ul className="product-features">
                  {updatedProduct.fields.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <table className="date-list">
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
                    {updatedProduct?.fields.announcedDate
                      ? formatToUTCTime(updatedProduct.fields.announcedDate)
                      : "N/A"}
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
                <h4>Sources:</h4>
                <ul
                  className="product-sources"
                  {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "sources" })}
                >
                  {updatedProduct.fields.sources.map((source) => (
                    <li key={source.fields.url}>
                      <a href={source.fields.url} target="_blank" rel="noopener noreferrer" className="source-link">
                        <span className="source-link-text">{source.fields.title}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square source-link-icon"></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <button className="footer-text last-updated-text" tabIndex="-1">
                Last updated{" "}
                <span
                  className="last-updated-time"
                  onClick={handleClick}
                  onKeyDown={handleKeyPress}
                  title="Click to toggle"
                  role="button"
                  aria-label="Toggle time format"
                  tabIndex="0"
                >
                  {showRelativeTime ? relativeTime : actualDate}
                </span>
              </button>
            </div>
            <div>
              <a
                href={`mailto:appleblueprints@gmail.com?subject=Edit%20request:%20${updatedProduct.fields.productName}&body=Please%20provide%20details%20of%20the%20edit%20you%20would%20like%20to%20make.`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card-button"
                id="suggest-button"
              >
                <i className="fas fa-wrench"></i>&nbsp;&nbsp;Suggest edit
              </a>
            </div>
          </div>
        </div>
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

function ProductImage({ image, product }) {
  const updatedProduct = useContentfulLiveUpdates(product);

  return (
    <>
      <img
        key={image.fields.file.url}
        className="product-image"
        width={Math.min(300, image.fields.file.details.image.width)}
        style={{
          aspectRatio: `${image.fields.file.details.image.width}/${image.fields.file.details.image.height}`,
        }}
        src={image.fields.file.url + "?fm=webp&h=300"}
        srcSet={`${image.fields.file.url}?fm=webp&h=300 1x, ${image.fields.file.url}?fm=webp&h=600 2x, ${image.fields.file.url}?fm=webp&h=900 3x`}
        alt={`The ${updatedProduct.fields.productName} is shown.`}
      />
      <a
        className="product-image-source-link"
        href={image?.fields.description}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View image source"
      >
        <span className="source-link-text">View image source</span>
        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </a>
    </>
  );
}

function formatToUTCTime(date) {
  return format(toZonedTime(parseISO(date.split("T")[0]), "UTC"), "MMMM d, yyyy");
}
