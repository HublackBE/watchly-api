import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json' with { type: 'json' };
import v1Routes from './routes/v1/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// API v1 routes
app.use('/api/v1', v1Routes);

// serve API docs at /api-docs
app.use(['/api-docs'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req, res) => res.redirect('/api-docs'));

// Basic health check route
app.get('/api', (_req, res) => res.json({ ok: true, version: 'v1' }));

export default app;