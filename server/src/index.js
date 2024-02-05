import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { UserAuthRouter } from './routes/userAuthRouter.js';
import { ProductsRouter } from './routes/productsRouter.js';
import { handleNotFound } from './middlewares/Error404.js';
import { PayRouter } from './routes/payRouter.js';
import { OrderRouter } from './routes/orderRouter.js';
import { HighRouter } from './routes/highRouter.js';
import { ColorRouter } from './routes/colorRouter.js';
import './config/dbConfig.js';
import './models/index.js';
import { dirname, join } from 'path';
import { fileURLToPath} from 'url';
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT || 3000;
const app = express();

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use(bodyParser.json());
app.use('/api/v1/public', express.static(join(CURRENT_DIR, './uploads')));

app.use('/api/v1/user/auth', UserAuthRouter);
app.use('/api/v1/products', ProductsRouter);
app.use('/api/v1/pay', PayRouter);
app.use('/api/v1/order', OrderRouter);
app.use('/api/v1/high', HighRouter);
app.use('/api/v1/color', ColorRouter);
app.use(handleNotFound);

app.listen( PORT , () => {
    console.log( `the server is running on port ${ PORT }` );
});