export const create_meta_data = (query:Record<string,unknown>, total:number) => {

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
//   const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
  };
};
