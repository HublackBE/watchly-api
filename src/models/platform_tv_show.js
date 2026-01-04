import prisma from '../lib/prisma.js';

export const all = async (opts = {}) =>
  await prisma.platform_tv_show.findMany({ orderBy: { created_at: 'desc' }, ...opts });

export const getById = async (id, opts = {}) =>
  await prisma.platform_tv_show.findUnique({ where: { id }, ...opts });

export const create = async (data) => await prisma.platform_tv_show.create({ data });

export const update = async (id, data) =>
  await prisma.platform_tv_show.update({ where: { id }, data });

export const remove = async (id) => await prisma.platform_tv_show.delete({ where: { id } });

export default { all, getById, create, update, remove };

export const removeByTvShowAndPlatform = async (tv_show_id, platform_id) =>
  await prisma.platform_tv_show.deleteMany({ where: { tv_show_id, platform_id } });
