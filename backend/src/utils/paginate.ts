type PaginationResult = {
  page: number;
  limit: number;
  skip: number;
  totalDocuments: number;
  totalPages: number;
};

export async function paginate(
  model: any,
  query: any,
  page: string | number,
  limit: string | number
): Promise<PaginationResult> {
  const pageNumber = parseInt(page as string, 10) || 1;
  const limitNumber = parseInt(limit as string, 10) || 5;
  const skip = (pageNumber - 1) * limitNumber;
  const totalDocuments = await model.countDocuments(query);

  const totalPages = Math.ceil(totalDocuments / limitNumber);

  return {
    page: pageNumber,
    limit: limitNumber,
    skip,
    totalDocuments,
    totalPages,
  };
}
