import { productsRouter } from '@/products/infrastructure/http/routes/products.route';
import { authRouter } from '@/users/infrastructure/http/routes/auth.route';
import { usersRouter } from '@/users/infrastructure/http/routes/users.route';
import { Router } from 'express';

const routes = Router();

/* Definição das rotas da aplicação */
routes.get('/', (req, res) => {
	return res.status(200).json({ message: 'Hello World' });
});

routes.use('/auth', authRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export { routes };
