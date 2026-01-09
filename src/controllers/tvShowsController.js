import * as TvShows from '../models/tv_shows.js';
import * as PTV from '../models/platform_tv_show.js';
import { parsePagination } from '../lib/pagination.js';

export const list = async (req, res, next) => {
  try {
    const { page, perPage, skip, take } = parsePagination(req);
    if (req.query.search && req.query.search.trim().length > 0) {
      const searchTerm = req.query.search.trim();
      const results = await TvShows.findMany({
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { director: { contains: searchTerm, mode: 'insensitive' } },
          { genre: { contains: searchTerm, mode: 'insensitive' } },
        ],
        skip,
        take,
      });
      return res.json({ page: page, perPage: perPage, total: results.length, totalPages: Math.max(1, Math.ceil(results.length / perPage)), hasMore: skip + results.length < results.length, items: results });
    }
    const total = await TvShows.count();
    const items = await TvShows.all({ skip, take });
    const totalPages = Math.max(1, Math.ceil((total || 0) / perPage));
    const hasMore = skip + items.length < (total || 0);
    res.json({ page, perPage, total, totalPages, hasMore, items });
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await TvShows.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await TvShows.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await TvShows.getById(id);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    const updated = await TvShows.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await TvShows.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// relation endpoints
export const platforms = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const platforms = await PTV.all({ where: { tv_show_id: id }, include: { platforms: true } });
    res.json(platforms);
  } catch (err) {
    next(err);
  }
};

export const addPlatform = async (req, res, next) => {
  try {
    const tv_show_id = Number(req.params.id);
    const { platform_id, external_id = null, url = null } = req.body || {};
    if (!platform_id) return res.status(400).json({ error: 'platform_id is required' });
    const entry = await PTV.create({ tv_show_id, platform_id: Number(platform_id), external_id, url });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const removePlatform = async (req, res, next) => {
  try {
    const tv_show_id = Number(req.params.id);
    const { platform_id } = req.body || {};
    if (!platform_id) return res.status(400).json({ error: 'platform_id is required' });
    await PTV.removeByTvShowAndPlatform(tv_show_id, Number(platform_id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove, platforms, addPlatform, removePlatform };
