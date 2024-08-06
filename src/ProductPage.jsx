import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { router } from "./router";
import { ProductsDataContext } from "./ProductsDataContext";
import { Modal } from "./Modal";
import { ProductContainer } from "./ProductCard";

export function ProductPage() {
  const productsData = useContext(ProductsDataContext);

  const allProducts = productsData?.flatMap((year) => year.months.flatMap((month) => month.products));
  const { product: slug } = useParams();

  const product = allProducts?.find((product) => product.fields.slug === slug);

  const closeModal = useCallback(() => {
    router.navigate("/");
  });

  return (
    <Modal onDismiss={closeModal}>
      {product ? (
        <ProductContainer key={product.sys.id} product={product} onDismiss={closeModal} />
      ) : (
        <div id="loading-text">Loading product..</div>
      )}
    </Modal>
  );
}
