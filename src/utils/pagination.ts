type buildDataType = {
  results: any;
  skip: number;
  limit: number;
  currentLength: number;
  total: number;
};

const buildData = ({ results, skip, limit, currentLength, total }: buildDataType) => {
  return {
    info: {
      // currentPage: skip,
      pages: skip,
      limit: limit,
      currentCount: currentLength,
      totalCount: total,
    },
    data: results,
  };
};

const checkPageLimit = (results: any, limit: number, page: number) => {
  if (limit == 0 && page == 0) {
    return results;
  }

  const numberOfItems = results.length;
  const numberPerPage = limit;
  const currentPage = page;
  const numberOfPages = Math.ceil(numberOfItems / numberPerPage);

  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;
  results = results.slice(trimStart, trimEnd);

  return results;
};

export { checkPageLimit, buildData };
