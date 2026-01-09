import * as User from '../models/user.js';
import * as Favs from '../models/favourite_movies.js';
import { parsePagination } from '../lib/pagination.js';

// simple slug generator
const generateSlug = (str) =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

export const list = async (req, res, next) => {
  try {
    const { skip, take } = parsePagination(req);
    const users = await User.all({ skip, take });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await User.getById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = req.body || {};
    if (!data.name) return res.status(400).json({ error: 'name is required' });
    // generate slug from name when not provided
    if (!data.slug || (typeof data.slug === 'string' && data.slug.trim() === '')) {
      data.slug = generateSlug(data.name);
    }
    const created = await User.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await User.getById(id);
    if (!exists) return res.status(404).json({ error: 'User not found' });
    if (!req.user) return res.status(401).json({ error: 'authentication required' });
    if (!req.user.is_admin && req.user.id !== id) return res.status(403).json({ error: 'forbidden' });
    const updated = await User.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await User.getById(id);
    if (!exists) return res.status(404).json({ error: 'User not found' });
    if (!req.user) return res.status(401).json({ error: 'authentication required' });
    if (!req.user.is_admin && req.user.id !== id) return res.status(403).json({ error: 'forbidden' });
    await User.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// relation endpoints
export const favouriteMovies = async (req, res, next) => {
  try {
    const user_id = Number(req.params.id);
    const favs = await Favs.all({ where: { user_id }, include: { movies: true } });
    res.json(favs);
  } catch (err) {
    next(err);
  }
};

export const addFavouriteMovie = async (req, res, next) => {
  try {
    const user_id = Number(req.params.id);
    const { movie_id } = req.body || {};
    if (!movie_id) return res.status(400).json({ error: 'movie_id is required' });
    const created = await Favs.create({ user_id, movie_id: Number(movie_id) });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const removeFavouriteMovie = async (req, res, next) => {
  try {
    const user_id = Number(req.params.id);
    const { movie_id } = req.body || {};
    if (!movie_id) return res.status(400).json({ error: 'movie_id is required' });
    await Favs.removeByUserAndMovie(user_id, Number(movie_id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove, favouriteMovies, addFavouriteMovie, removeFavouriteMovie };