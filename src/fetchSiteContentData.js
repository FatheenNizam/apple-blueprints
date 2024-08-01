import { contentfulClient } from "./contentfulClient";

export const fetchSiteContentData = async () =>
  await contentfulClient
    .getEntries({ "sys.id": import.meta.env.VITE_CONTENTFUL_ENTRY_ID })
    .then((data) => data.items[0]);
