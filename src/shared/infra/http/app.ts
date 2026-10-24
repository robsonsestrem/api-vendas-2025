import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import swaggerDocument from '@config/swagger';

const app = express();

app.use(cors());
app.use(express.json());

const swaggerEnabled =
  process.env.NODE_ENV !== 'production' ||
  process.env.ENABLE_SWAGGER === 'true';

if (swaggerEnabled) {
  app.get('/api-docs.json', (request, response) =>
    response.json(swaggerDocument)
  );

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customSiteTitle: 'API Vendas — Documentação',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
      },
    })
  );
}

app.use(rateLimiter);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

export { app };
