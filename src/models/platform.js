import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
    prisma.platforms.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
    prisma.platforms.findUnique({ where: { id }, ...opts });

export const getBySlug = async (slug, opts = {}) =>
    prisma.platforms.findUnique({ where: { slug }, ...opts });

export const create = async (data) => prisma.platforms.create({ data });

export const update = async (id, data) => prisma.platforms.update({ where: { id }, data });

export const remove = async (id) => prisma.platforms.delete({ where: { id } });

// relation helpers
export const moviesForPlatform = async (platform_id) =>
    prisma.movie_platform.findMany({ where: { platform_id }, include: { movies: true } });

export const addMoviePlatform = async (data) =>
    prisma.movie_platform.create({ data });

export const removeMoviePlatform = async (movie_id, platform_id) =>
    prisma.movie_platform.deleteMany({ where: { movie_id, platform_id } });