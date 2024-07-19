// import React, { useContext, useEffect, useRef, useMemo, useState } from "react";
// import { statusLabels } from "./statusLabels";
// import { statusIcons } from "./statusIcons";
// import { ProductsDataContext } from "./ProductsDataContext";
// import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
// import { ContentfulLivePreview } from "@contentful/live-preview";
// import { router } from "./router";
// import { format, formatDistanceToNow } from "date-fns";

// export function ProductContainer({ product, onDismiss }) {
//   const [isHovered, setIsHovered] = useState(false); // State for hover effect
//   const productsData = useContext(ProductsDataContext);
//   const sortedProductSlugs = useMemo(
//     () =>
//       productsData.items
//         .toSorted((a, b) => new Date(a.fields.releasedDate).getTime() - new Date(b.fields.releasedDate).getTime())
//         .map((item) => item.fields.slug),
//     [productsData]
//   );
//   const currentProductIndex = sortedProductSlugs.indexOf(product.fields.slug);
//   const nextProductSlug = sortedProductSlugs[currentProductIndex + 1];
//   const previousProductSlug = sortedProductSlugs[currentProductIndex - 1];

//   const updatedProduct = useContentfulLiveUpdates(product);
//   const updatedAssets = useContentfulLiveUpdates(productsData.includes.Asset);
//   const updatedEntries = useContentfulLiveUpdates(productsData.includes.Entry);

//   const images = updatedProduct.fields.images?.map((image) =>
//     updatedAssets.find((asset) => asset.sys.id === image.sys.id)
//   );
//   const sources = updatedProduct.fields.sources?.map((source) =>
//     updatedEntries.find((entry) => entry.sys.id === source.sys.id)
//   );

//   const handleNextClick = () => {
//     if (nextProductSlug) {
//       router.navigate(`/product/${nextProductSlug}`);
//     }
//   };

//   const handlePreviousClick = () => {
//     if (previousProductSlug) {
//       router.navigate(`/product/${previousProductSlug}`);
//     }
//   };

//   useEffect(() => {
//     const handler = (event) => {
//       switch (event.key) {
//         case "Escape":
//           onDismiss();
//           break;
//         case "ArrowLeft":
//           if (previousProductSlug) router.navigate(`/product/${previousProductSlug}`);
//           break;
//         case "ArrowRight":
//           if (nextProductSlug) router.navigate(`/product/${nextProductSlug}`);
//           break;
//       }
//     };

//     document.addEventListener("keydown", handler);

//     return () => {
//       document.removeEventListener("keydown", handler);
//     };
//   }, [previousProductSlug, nextProductSlug]);

//   const productContainerRef = useRef();
//   useEffect(() => {
//     productContainerRef.current?.focus();
//   }, [productContainerRef.current]);

//   return (
//     <div className="product-container-wrapper">
//       <div className="button-container">
//         <button
//           className="product-navigation-button"
//           onClick={handlePreviousClick}
//           style={{ visibility: previousProductSlug ? "visible" : "hidden" }}
//         >
//           <i className="fa-solid fa-arrow-left"></i> Previous
//         </button>
//       </div>
//       <div className="product-container" ref={productContainerRef}>
//         <button className="fa-solid fa-xmark close-button" onClick={onDismiss} />
//         <div className="product-container-content">
//           <div className="top-section">
//             <div className="product-info">
//               <div className="titlebar">
//                 <div
//                   className={"product-status " + updatedProduct.fields.status + "-product"}
//                   {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "status" })}
//                 >
//                   <i className={statusIcons[updatedProduct.fields.status]} />{" "}
//                   {statusLabels[updatedProduct.fields.status]}
//                 </div>
//                 <div
//                   className="product-name"
//                   {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "productName" })}
//                 >
//                   {updatedProduct.fields.productName}
//                 </div>
//               </div>
//               <div
//                 className="product-description"
//                 {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "description" })}
//               >
//                 {updatedProduct.fields.description}
//               </div>
//             </div>
//             {images && (
//               <div
//                 className="product-image-container"
//                 {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "images" })}
//               >
//                 {images.map((image) => (
//                   <img
//                     key={image.fields.file.url}
//                     className="product-image"
//                     src={image.fields.file.url + "?h=300"}
//                     srcset={`${image.fields.file.url}?h=300 1x, ${image.fields.file.url}?h=600 2x, ${image.fields.file.url}?h=900 3x`}
//                     alt={image.fields.description}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//           {updatedProduct.fields.features && (
//             <div
//               className="product-header"
//               {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "features" })}
//             >
//               What's new:
//               <ul className="product-features">
//                 {updatedProduct.fields.features.map((feature) => (
//                   <li key={feature}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <table>
//             <tbody>
//               <tr>
//                 <td>Rumored</td>
//                 <td>
//                   {updatedProduct?.fields.rumouredDate
//                     ? format(new Date(updatedProduct.fields.rumouredDate), "MMMM d, yyyy")
//                     : "N/A"}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Announced</td>
//                 <td>
//                   {updatedProduct?.fields.announcedDate
//                     ? format(new Date(updatedProduct.fields.announcedDate), "MMMM d, yyyy")
//                     : "N/A"}
//                 </td>{" "}
//               </tr>
//               <tr>
//                 <td>Released</td>
//                 <td>
//                   {updatedProduct?.fields.releasedDate
//                     ? format(new Date(updatedProduct.fields.releasedDate), "MMMM d, yyyy")
//                     : "N/A"}
//                 </td>{" "}
//               </tr>
//             </tbody>
//           </table>
//           {sources && (
//             <div className="product-header sources-header">
//               Sources:
//               <ul
//                 className="product-sources"
//                 {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "sources" })}
//               >
//                 {sources.map((source) => (
//                   <li key={source} className="source-link">
//                     <a
//                       href={source.fields.url}
//                       target="_blank"
//                       className="source-link"
//                       onMouseEnter={() => setIsHovered(true)}
//                       onMouseLeave={() => setIsHovered(false)}
//                     >
//                       <span className={`source-link-text ${isHovered ? "hovered-text" : ""}`}>
//                         {source.fields.title}
//                       </span>
//                       <i className="fa-solid fa-arrow-up-right-from-square source-link-icon"></i>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           <div className="product-container-last-updated-text">
//             Last updated: {format(new Date(updatedProduct?.sys.updatedAt), "MMMM d, yyyy, h:mm a")} (
//             {formatDistanceToNow(new Date(updatedProduct?.sys.updatedAt))} ago)
//           </div>
//           <div>
//             <a
//               href={`mailto:appleblueprints@gmail.com?subject=Edit%20request:%20${updatedProduct.fields.productName}&body=Please%20provide%20details%20of%20the%20edit%20you%20would%20like%20to%20make.`}
//               target="_blank"
//               className="product-container-button"
//               id="suggest-button"
//             >
//               <i className="fas fa-wrench"></i>&nbsp;&nbsp;Suggest edit
//             </a>{" "}
//           </div>
//         </div>
//       </div>
//       <div className="button-container">
//         <button
//           className="product-navigation-button"
//           onClick={handleNextClick}
//           style={{ visibility: nextProductSlug ? "visible" : "hidden" }}
//         >
//           <i className="fa-solid fa-arrow-right"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useContext, useMemo, useState, useEffect } from "react";
import { statusLabels } from "./statusLabels";
import { statusIcons } from "./statusIcons";
import { ProductsDataContext } from "./ProductsDataContext";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { router } from "./router";
import { format, formatDistanceToNow } from "date-fns";
import { useFocusOnUpdate } from "./useFocusOnUpdate";

export function ProductContainer({ product, onDismiss }) {
  const [isHovered, setIsHovered] = useState(false);
  const productsData = useContext(ProductsDataContext);
  const sortedProductSlugs = useMemo(
    () =>
      productsData.items
        .toSorted((a, b) => new Date(a.fields.releasedDate).getTime() - new Date(b.fields.releasedDate).getTime())
        .map((item) => item.fields.slug),
    [productsData]
  );
  const currentProductIndex = sortedProductSlugs.indexOf(product.fields.slug);
  const nextProductSlug = sortedProductSlugs[currentProductIndex + 1];
  const previousProductSlug = sortedProductSlugs[currentProductIndex - 1];

  const updatedProduct = useContentfulLiveUpdates(product);
  const updatedAssets = useContentfulLiveUpdates(productsData.includes.Asset);
  const updatedEntries = useContentfulLiveUpdates(productsData.includes.Entry);

  const images = updatedProduct.fields.images?.map((image) =>
    updatedAssets.find((asset) => asset.sys.id === image.sys.id)
  );
  const sources = updatedProduct.fields.sources?.map((source) =>
    updatedEntries.find((entry) => entry.sys.id === source.sys.id)
  );

  const handleNextClick = () => {
    if (nextProductSlug) {
      router.navigate(`/product/${nextProductSlug}`);
    }
  };

  const handlePreviousClick = () => {
    if (previousProductSlug) {
      router.navigate(`/product/${previousProductSlug}`);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      switch (event.key) {
        case "Escape":
          onDismiss();
          break;
        case "ArrowLeft":
          if (previousProductSlug) router.navigate(`/product/${previousProductSlug}`);
          break;
        case "ArrowRight":
          if (nextProductSlug) router.navigate(`/product/${nextProductSlug}`);
          break;
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [previousProductSlug, nextProductSlug]);

  const productContainerRef = useFocusOnUpdate();

  return (
    <div className="product-container-wrapper">
      <div className="button-container">
        <button
          className="product-navigation-button"
          onClick={handlePreviousClick}
          style={{ visibility: previousProductSlug ? "visible" : "hidden" }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div
        className="product-container"
        ref={productContainerRef}
        tabIndex="-1" // Ensure this is set
        role="dialog"
        aria-labelledby="product-title"
      >
        <button className="fa-solid fa-xmark close-button" onClick={onDismiss} aria-label="Close" />
        <div className="product-container-content">
          <div className="top-section">
            <div className="product-info">
              <div className="titlebar">
                <div
                  className={"product-status " + updatedProduct.fields.status + "-product"}
                  {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "status" })}
                >
                  <i className={statusIcons[updatedProduct.fields.status]} />{" "}
                  {statusLabels[updatedProduct.fields.status]}
                </div>
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
            {images && (
              <div
                className="product-image-container"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "images" })}
              >
                {images.map((image) => (
                  <img
                    key={image.fields.file.url}
                    className="product-image"
                    src={image.fields.file.url + "?fm=webp&h=300"}
                    srcSet={`${image.fields.file.url}?fm=webp&h=300 1x, ${image.fields.file.url}?fm=webp&h=600 2x, ${image.fields.file.url}?fm=webp&h=900 3x`}
                    alt={image.fields.description}
                  />
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
                  {updatedProduct?.fields.rumouredDate
                    ? format(new Date(updatedProduct.fields.rumouredDate), "MMMM d, yyyy")
                    : "N/A"}
                </td>
              </tr>
              <tr>
                <td>Announced</td>
                <td>
                  {updatedProduct?.fields.announcedDate
                    ? format(new Date(updatedProduct.fields.announcedDate), "MMMM d, yyyy")
                    : "N/A"}
                </td>{" "}
              </tr>
              <tr>
                <td>Released</td>
                <td>
                  {updatedProduct?.fields.releasedDate
                    ? format(new Date(updatedProduct.fields.releasedDate), "MMMM d, yyyy")
                    : "N/A"}
                </td>{" "}
              </tr>
            </tbody>
          </table>
          {sources && (
            <div className="product-header sources-header">
              Sources:
              <ul
                className="product-sources"
                {...ContentfulLivePreview.getProps({ entryId: product.sys.id, fieldId: "sources" })}
              >
                {sources.map((source) => (
                  <li key={source} className="source-link">
                    <a
                      href={source.fields.url}
                      target="_blank"
                      className="source-link"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span className={`source-link-text ${isHovered ? "hovered-text" : ""}`}>
                        {source.fields.title}
                      </span>
                      <i className="fa-solid fa-arrow-up-right-from-square source-link-icon"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="product-container-last-updated-text">
            Last updated: {format(new Date(updatedProduct?.sys.updatedAt), "MMMM d, yyyy, h:mm a")} (
            {formatDistanceToNow(new Date(updatedProduct?.sys.updatedAt))} ago)
          </div>
          <div>
            <a
              href={`mailto:appleblueprints@gmail.com?subject=Edit%20request:%20${updatedProduct.fields.productName}&body=Please%20provide%20details%20of%20the%20edit%20you%20would%20like%20to%20make.`}
              target="_blank"
              className="product-container-button"
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
          onClick={handleNextClick}
          style={{ visibility: nextProductSlug ? "visible" : "hidden" }}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
