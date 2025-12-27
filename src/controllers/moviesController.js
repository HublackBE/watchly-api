import * as Movie from '../models/movie.js';

export const list = async (req, res, next) => {
  try {
    const movies = await Movie.all();
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const movie = await Movie.getById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { title, year, user_id } = req.body;
    if (!title) return res.status(400).json({ error: 'title is required' });
    const created = await Movie.create({ title, year, user_id });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const exists = await Movie.getById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Movie not found' });
    const updated = await Movie.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const exists = await Movie.getById(req.params.id);
    if (!exists) return res.status(404).json({ error: 'Movie not found' });
    await Movie.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove };
