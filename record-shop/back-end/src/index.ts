// src/index.ts

import RecordStoreController from './controllers/RecordStore';
import RecordStore from './interfaces/Records';
import CustomRouter from './routes/Router';
import App from './Server';

const server = new App();

const recordStoreController = new RecordStoreController();

const recordStoreRouter = new CustomRouter<RecordStore>();
recordStoreRouter.addRoute(recordStoreController);

server.addRouter(recordStoreRouter.router);

server.startServer();