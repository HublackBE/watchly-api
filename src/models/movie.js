import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
    await prisma.movies.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const findMany = async (filter = {}, opts = {}) =>
    await prisma.movies.findMany({ where: { ...filter }, ...opts });

export const count = async (opts = {}) =>
    await prisma.movies.count({ ...opts });

export const getById = async (id, opts = {}) =>
    await prisma.movies.findUnique({ where: { id }, ...opts });

export const getBySlug = async (slug, opts = {}) =>
    await prisma.movies.findUnique({ where: { slug }, ...opts });

export const create = async ({ title, slug, description = null, release_date = null, director = null, genre = null, rating = null, poster_path = null, imdb_id = null, added_by = null }) =>
    await prisma.movies.create({ data: { title, slug, description, release_date, director, genre, rating, poster_path, imdb_id, added_by } });

export const update = async (id, data) =>
    await prisma.movies.update({ where: { id }, data });

export const remove = async (id) =>
    await prisma.movies.delete({ where: { id } });

export const addPlatform = async ({ movie_id, platform_id, external_id = null, url = null }) =>
    await prisma.movie_platform.create({ data: { movie_id, platform_id, external_id, url } });

export const platformsForMovie = async (movie_id) =>
    await prisma.movie_platform.findMany({ where: { movie_id }, include: { platforms: true } });