import prisma from '../lib/prisma.js';

export const create = async ({ jti, token_hash, user_id, expires_at }) =>
  await prisma.refresh_tokens.create({ data: { jti, token_hash, user_id, expires_at } });

export const findByJti = async (jti) =>
  await prisma.refresh_tokens.findUnique({ where: { jti } });

export const revokeByJti = async (jti) =>
  await prisma.refresh_tokens.updateMany({ where: { jti }, data: { revoked: true } });

export const deleteByJti = async (jti) =>
  await prisma.refresh_tokens.deleteMany({ where: { jti } });

export const deleteAllForUser = async (user_id) =>
  await prisma.refresh_tokens.deleteMany({ where: { user_id } });

export default { create, findByJti, revokeByJti, deleteByJti, deleteAllForUser };
