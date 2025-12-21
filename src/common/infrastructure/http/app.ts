import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API documentation',
			version: '1.0.0',
			description: 'API de exemplo para o artigo de TDD',
		},
	},
	apis: ['./src/**/http/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

/* Definir quem pode acessar a API */
app.use(cors());

/* Definir de que forma essa API vai estar manipulando as informações */
app.use(express.json());

/**  Definindo a rota para o swagger 
     http://localhost:3333/docs/
  */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Chamar as rotas da aplicação */
app.use(routes);

/* Middleware para tratamentos de erros */
app.use(errorHandler);

export { app };
