import * as Comments from '../models/comments.js';

export const list = async (req, res, next) => {
  try {
    const items = await Comments.all();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const get = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = await Comments.getById(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const created = await Comments.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const exists = await Comments.getById(id);
    if (!exists) return res.status(404).json({ error: 'Not found' });
    const updated = await Comments.update(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await Comments.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove };
