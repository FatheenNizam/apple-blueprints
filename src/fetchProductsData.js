export async function fetchProductsData() {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const environmentId = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&content_type=product`;
  const data = await fetch(apiUrl).then((res) => res.json());
  console.log({ data });
  return data;
}
