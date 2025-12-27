import * as Movie from "../models/movie.js";

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