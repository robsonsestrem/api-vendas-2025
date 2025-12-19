import { productsRouter } from '@/products/infrastructure/http/routes/products.route';
import { Router } from 'express';

const routes = Router();

/* Definição das rotas da aplicação */
routes.get('/', (req, res) => {
	return res.status(200).json({ message: 'Hello World' });
});

routes.use('/products', productsRouter);

export { routes };
