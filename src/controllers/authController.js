import * as Users from '../models/user.js';
import * as Refresh from '../models/refresh_token.js';
import { hashPassword, comparePassword, createJti, signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/auth.js';
import bcrypt from 'bcrypt';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/auth',
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });
    const existing = await Users.findByEmail(email);
    if (existing) return res.status(400).json({ error: 'email already in use' });
    const existingName = await Users.findByName(name);
    if (existingName) return res.status(400).json({ error: 'name already in use' });
    const pwdHash = await hashPassword(password);
    const created = await Users.create(
      { name, email, password: pwdHash },
      { select: { id: true, name: true, email: true, is_admin: true, avatar_path: true, created_at: true } }
    );
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const user = await Users.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await comparePassword(password, user.password);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const accessToken = signAccessToken(user.id);
    const jti = createJti();
    const refreshToken = signRefreshToken(user.id, jti);

    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + (parseDuration(process.env.REFRESH_TOKEN_EXPIRES_IN || '7d')));
    await Refresh.create({ jti, token_hash: tokenHash, user_id: user.id, expires_at: expiresAt });

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

function parseDuration(spec) {
  // supports simple '7d', '15m' formats
  if (!spec) return 7 * 24 * 60 * 60 * 1000;
  const n = parseInt(spec.slice(0, -1), 10);
  const unit = spec.slice(-1);
  if (unit === 'd') return n * 24 * 60 * 60 * 1000;
  if (unit === 'h') return n * 60 * 60 * 1000;
  if (unit === 'm') return n * 60 * 1000;
  return parseInt(spec, 10) || 0;
}

export const refresh = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'no refresh token' });
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'invalid refresh token' });
    }
    const { sub, jti } = payload;
    const record = await Refresh.findByJti(jti);
    if (!record || record.revoked) return res.status(401).json({ error: 'token revoked or not found' });
    const match = await bcrypt.compare(token, record.token_hash);
    if (!match) return res.status(401).json({ error: 'token mismatch' });

    // rotate
    await Refresh.deleteByJti(jti);
    const newJti = createJti();
    const newRefresh = signRefreshToken(sub, newJti);
    const newHash = await bcrypt.hash(newRefresh, 10);
    const expiresAt = new Date(Date.now() + (parseDuration(process.env.REFRESH_TOKEN_EXPIRES_IN || '7d')));
    await Refresh.create({ jti: newJti, token_hash: newHash, user_id: Number(sub), expires_at: expiresAt });

    const accessToken = signAccessToken(sub);
    res.cookie('refreshToken', newRefresh, cookieOptions);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        await Refresh.deleteByJti(payload.jti);
      } catch (e) {
        // ignore
      }
    }
    res.clearCookie('refreshToken', { path: '/auth' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { register, login, refresh, logout };
