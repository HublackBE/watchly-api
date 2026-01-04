import prisma from '../lib/prisma.js';

export const all = async (opts = {}) => await prisma.favourite_movies.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) => await prisma.favourite_movies.findUnique({ where: { id }, ...opts });

export const create = async (data) => await prisma.favourite_movies.create({ data });

export const update = async (id, data) => await prisma.favourite_movies.update({ where: { id }, data });

export const remove = async (id) => await prisma.favourite_movies.delete({ where: { id } });

export const removeByUserAndMovie = async (user_id, movie_id) =>
	await prisma.favourite_movies.deleteMany({ where: { user_id, movie_id } });

export default { all, getById, create, update, remove, removeByUserAndMovie };
