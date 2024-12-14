import {createServer} from 'http';
import express from 'express';
import cors from 'cors';
import {connectMongoDb} from './database/connection';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './utils/swaggerConfig';

import strosekRoutes from './routes/strosekRoutes';
import zaposleniRoutes from './routes/zaposleniRoutes';
import kpiRoutes from './routes/kpiRoutes';

import * as dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/stroski', strosekRoutes)
app.use('/zaposleni', zaposleniRoutes)
app.use('/kpi', kpiRoutes)

const port = 3000


connectMongoDb();

export const startServer = () => {
	// Setup HTTP server
	const httpServer = createServer(app);
	console.log('Listening...');
	httpServer.listen(3000);
	return httpServer;
};

export default app;

if (process.env.NODE_ENV !== 'test') {
	startServer();
}