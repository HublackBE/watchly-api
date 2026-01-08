import { verifyAccessToken } from '../lib/auth.js';
import * as Users from '../models/user.js';

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'missing or invalid authorization header' });
    const token = parts[1];
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'invalid or expired token' });
    }
    const userId = Number(payload.sub);
    const user = await Users.getById(userId);
    if (!user) return res.status(401).json({ error: 'user not found' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'authentication required' });
  if (!req.user.is_admin) return res.status(403).json({ error: 'admin privileges required' });
  next();
};

export default { requireAuth, requireAdmin };
