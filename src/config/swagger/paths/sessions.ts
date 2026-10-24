const sessionsPaths = {
  '/sessions': {
    post: {
      tags: ['Sessões'],
      summary: 'Autentica um usuário e devolve o token JWT',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateSessionBody' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Autenticado com sucesso.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SessionResponse' },
            },
          },
        },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': {
          description: 'Credenciais inválidas.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'error',
                message: 'Incorrect email/password combination.',
              },
            },
          },
        },
        '429': { $ref: '#/components/responses/TooManyRequests' },
      },
    },
  },
};

export default sessionsPaths;
