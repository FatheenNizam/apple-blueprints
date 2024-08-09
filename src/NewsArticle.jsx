import React, { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { router } from "./router";
import { ProductsDataContext } from "./ProductsDataContext";
import { Modal } from "./Modal";
import { ProductCard } from "./ProductCard";

export function NewsArticle() {
  const productsData = useContext(ProductsDataContext);

  const allProducts = productsData?.flatMap((year) => year.months.flatMap((month) => month.products));
  const { product: slug } = useParams();

  const product = allProducts?.find((product) => product.fields.slug === slug);

  const closeModal = useCallback(() => {
    router.navigate("/");
  });

  return <div>News Article</div>;
}
