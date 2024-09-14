import { contentfulClient } from "./contentfulClient";

export const fetchProductsData = async () => await contentfulClient.getEntries({ content_type: "product" });
