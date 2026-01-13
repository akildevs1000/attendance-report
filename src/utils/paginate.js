function paginateTableData(data, firstPageCount = 7, perPageCount = 10) {
  if (!data || data.length === 0) return [];

  const pages = [];
  pages.push(data.slice(0, firstPageCount));

  let index = firstPageCount;
  while (index < data.length) {
    pages.push(data.slice(index, index + perPageCount));
    index += perPageCount;
  }

  return pages;
};


export default paginateTableData;