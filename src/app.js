import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import v1Routes from './routes/v1/index.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// API v1 routes
app.use('/api/v1', v1Routes);

// serve API docs at /api-docs
app.use(['/', '/api', '/api-docs'], swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// simple root status
app.get('/', (_req, res) => res.json({ ok: true, version: 'v1' }));