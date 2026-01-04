import * as Movie from "../models/movie.js";
import * as Platform from '../models/platform.js';
import * as Favs from '../models/favourite_movies.js';

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
    const id = Number(req.params.id);
    const movie = await Movie.getById(id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.title)
      return res.status(400).json({ error: "title is required" });
    const created = await Movie.create(data);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await Movie.getById(id);
    if (!exists) return res.status(404).json({ error: "Movie not found" });
    const updated = await Movie.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await Movie.getById(id);
    if (!exists) return res.status(404).json({ error: "Movie not found" });
    await Movie.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove, platforms, addPlatform, removePlatform, favourites, addFavourite, removeFavourite };


// relation endpoints
export const platforms = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const platforms = await Movie.platformsForMovie(id);
    res.json(platforms);
  } catch (err) {
    next(err);
  }
};

export const addPlatform = async (req, res, next) => {
  try {
    const movie_id = Number(req.params.id);
    const { platform_id, external_id = null, url = null } = req.body || {};
    if (!platform_id) return res.status(400).json({ error: 'platform_id is required' });
    const entry = await Movie.addPlatform({ movie_id, platform_id: Number(platform_id), external_id, url });
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};

export const removePlatform = async (req, res, next) => {
  try {
    const movie_id = Number(req.params.id);
    const { platform_id } = req.body || {};
    if (!platform_id) return res.status(400).json({ error: 'platform_id is required' });
    await Platform.removeMoviePlatform(Number(movie_id), Number(platform_id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const favourites = async (req, res, next) => {
  try {
    const movie_id = Number(req.params.id);
    const favs = await Favs.all({ where: { movie_id }, include: { users: true } });
    res.json(favs);
  } catch (err) {
    next(err);
  }
};

export const addFavourite = async (req, res, next) => {
  try {
    const movie_id = Number(req.params.id);
    const { user_id } = req.body || {};
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    const created = await Favs.create({ user_id: Number(user_id), movie_id });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const removeFavourite = async (req, res, next) => {
  try {
    const movie_id = Number(req.params.id);
    const { user_id } = req.body || {};
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    await Favs.removeByUserAndMovie(Number(user_id), movie_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};