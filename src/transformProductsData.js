import { productLinePriority } from "./productLinePriority";

export function transformProductsData(data) {
  const productsByYear = [];
  const unknownProducts = [];

  data.items.forEach((item) => {
    if (!item.fields.releasedDate) {
      unknownProducts.push(item);
      return;
    }

    const releasedDate = new Date(item.fields.releasedDate);
    const year = releasedDate.getUTCFullYear();
    const monthIndex = releasedDate.getUTCMonth();
    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(releasedDate);

    let productsForYear = productsByYear.find((yearObject) => yearObject.yearName === year);
    if (!productsForYear) {
      productsForYear = { yearName: year, months: [] };
      productsByYear.push(productsForYear);
    }

    let productsForMonth = productsForYear.months.find((monthObject) => monthObject.name === monthName);
    if (!productsForMonth) {
      productsForMonth = { name: monthName, index: monthIndex, products: [] };
      productsForYear.months.push(productsForMonth);
    }

    productsForMonth.products.push(item);
  });

  productsByYear.sort((a, b) => b.yearName - a.yearName);
  productsByYear.forEach((year) => year.months.sort((a, b) => a.index - b.index));
  productsByYear.forEach((year) =>
    year.months.forEach((month) =>
      month.products.sort((a, b) => {
        const productLineA = a.fields.productLine;
        const productLineB = b.fields.productLine;

        const indexA = productLinePriority.indexOf(productLineA);
        const indexB = productLinePriority.indexOf(productLineB);

        if (indexA === indexB) {
          const nameA = a.fields.productName || "";
          const nameB = b.fields.productName || "";
          return nameA.localeCompare(nameB);
        }

        return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
      })
    )
  );

  const lastUpdated = data.items
    .map((item) => new Date(item.sys.updatedAt))
    .sort((a, b) => a.getTime() - b.getTime())
    .pop();

  return { productsByYear, unknownProducts, lastUpdated };
}
