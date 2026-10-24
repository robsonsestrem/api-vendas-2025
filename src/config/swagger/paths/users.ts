const usersPaths = {
  '/users': {
    post: {
      tags: ['Usuários'],
      summary: 'Cria um novo usuário',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserBody' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Usuário criado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': { $ref: '#/components/responses/ValidationError' },
        '409': { $ref: '#/components/responses/Conflict' },
        '429': { $ref: '#/components/responses/TooManyRequests' },
      },
    },
    get: {
      tags: ['Usuários'],
      summary: 'Lista usuários com paginação',
      security: [{ bearerAuth: [] }],
      parameters: [
        { $ref: '#/components/parameters/PageParam' },
        { $ref: '#/components/parameters/LimitParam' },
      ],
      responses: {
        '200': {
          description: 'Lista paginada de usuários.',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/PaginationMeta' },
                  {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '429': { $ref: '#/components/responses/TooManyRequests' },
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: ['Usuários'],
      summary: 'Retorna um usuário pelo ID',
      security: [{ bearerAuth: [] }],
      parameters: [{ $ref: '#/components/parameters/IdParam' }],
      responses: {
        '200': {
          description: 'Usuário encontrado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },
  '/users/avatar': {
    patch: {
      tags: ['Perfil'],
      summary: 'Atualiza o avatar do usuário autenticado',
      description:
        'Enviado como multipart/form-data. Acompanha o arquivo no campo "avatar".',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['avatar'],
              properties: {
                avatar: { type: 'string', format: 'binary' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Avatar atualizado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': {
          description:
            'Arquivo ausente ou tipo não permitido. Requer que o controller lance AppError.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { status: 'error', message: 'Avatar file is missing.' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
  },
};

export default usersPaths;
