import * as User from '../models/user.js';

export const list = async (req, res, next) => {
  try {
    const users = await User.all();
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
    const data = req.body;
    if (!data.name) return res.status(400).json({ error: 'name is required' });
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
    await User.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { list, get, create, update, remove };