import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);

export const createJti = () => (crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex'));

export const signAccessToken = (userId, extras = {}) => {
  const payload = { sub: String(userId), ...extras };
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev_jwt_secret', { expiresIn: ACCESS_EXPIRES });
};

export const signRefreshToken = (userId, jti) => {
  const payload = { sub: String(userId), jti };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret', { expiresIn: REFRESH_EXPIRES });
};

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET || 'dev_jwt_secret');
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'dev_refresh_secret');

export default { hashPassword, comparePassword, createJti, signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
