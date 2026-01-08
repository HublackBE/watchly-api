import * as Movie from '../models/movie.js';
import * as TvShows from '../models/tv_shows.js';
import { parsePagination } from '../lib/pagination.js';

const toTimestamp = (d) => {
  if (!d) return 0;
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : 0;
};

export const list = async (req, res, next) => {
  try {
    const { page, perPage } = parsePagination(req);

    // fetch counts for accurate total
    const [movieCount, tvCount] = await Promise.all([Movie.count(), TvShows.count()]);
    const total = (movieCount || 0) + (tvCount || 0);

    // fetch enough items from each source to build the requested page after merging
    const needed = page * perPage;
    const [moviesRaw, tvShowsRaw] = await Promise.all([
      Movie.all({ skip: 0, take: needed }),
      TvShows.all({ skip: 0, take: needed }),
    ]);

    const movies = moviesRaw.map((m) => ({ ...m, __type: 'movie' }));
    const tvShows = tvShowsRaw.map((t) => ({ ...t, __type: 'tv_show' }));

    const merged = [...movies, ...tvShows].sort((a, b) => toTimestamp(b.created_at) - toTimestamp(a.created_at));

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const pageItems = merged.slice(start, end);

    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const hasMore = end < total;

    res.json({ page, perPage, total, totalPages, hasMore, items: pageItems });
  } catch (err) {
    next(err);
  }
};

export default { list };
