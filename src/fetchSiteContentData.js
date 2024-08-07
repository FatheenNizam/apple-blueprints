export async function fetchSiteContentData() {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const environmentId = "master";
  const entryId = "4NbYhPPGmnIHBtE5KBp3oz";
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries/${entryId}?access_token=${accessToken}`;
  const data = await fetch(apiUrl).then((res) => res.json());

  return data;
}
