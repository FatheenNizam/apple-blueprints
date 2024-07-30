import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { router } from "./router";
import { ProductsDataContext } from "./ProductsDataContext";
import { Modal } from "./Modal";
import { ProductContainer } from "./ProductCard";

export function ProductPage() {
  const productsData = useContext(ProductsDataContext);
  const { product: slug } = useParams();

  const product = productsData?.items.find((product) => product.fields.slug === slug);

  const closeModal = useCallback(() => {
    router.navigate("/");
  });

  return (
    <Modal onDismiss={closeModal}>
      {product ? (
        <ProductContainer key={product.sys.id} product={product} onDismiss={closeModal} />
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
}
