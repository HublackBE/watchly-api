import * as Platform from '../models/platform.js';

export const list = async (req, res, next) => {
  try {
    const platforms = await Platform.all();
    res.json(platforms);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const platform = await Platform.getById(id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    res.json(platform);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.name || !data.slug) return res.status(400).json({ error: 'name and slug are required' });
    const created = await Platform.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await Platform.getById(id);
    if (!exists) return res.status(404).json({ error: 'Platform not found' });
    const updated = await Platform.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await Platform.getById(id);
    if (!exists) return res.status(404).json({ error: 'Platform not found' });
    await Platform.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// relation endpoints
export const movies = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const movies = await Platform.moviesForPlatform(id);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const addMovie = async (req, res, next) => {
  try {
    const platform_id = Number(req.params.id);
    const { movie_id, external_id = null, url = null } = req.body || {};
    if (!movie_id) return res.status(400).json({ error: 'movie_id is required' });
    const entry = await Platform.addMoviePlatform({ movie_id: Number(movie_id), platform_id, external_id, url });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const removeMovie = async (req, res, next) => {
  try {
    const platform_id = Number(req.params.id);
    const { movie_id } = req.body || {};
    if (!movie_id) return res.status(400).json({ error: 'movie_id is required' });
    await Platform.removeMoviePlatform(Number(movie_id), platform_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove, movies, addMovie, removeMovie };