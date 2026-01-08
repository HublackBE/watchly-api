export const parsePagination = (req, defaultPerPage = 20, maxPerPage = 100) => {
  const page = Math.max(1, parseInt(req.query && req.query.page, 10) || 1);
  let perPage = parseInt(req.query && req.query.perPage, 10);
  if (!perPage || Number.isNaN(perPage)) perPage = defaultPerPage;
  perPage = Math.min(maxPerPage, Math.max(1, perPage));
  const skip = (page - 1) * perPage;
  const take = perPage;
  return { page, perPage, skip, take };
};
