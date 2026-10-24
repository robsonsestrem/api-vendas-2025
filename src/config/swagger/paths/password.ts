const passwordPaths = {
  '/password/forgot': {
    post: {
      tags: ['Senha'],
      summary: 'Envia e-mail com token de recuperação de senha',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ForgotPasswordBody' },
          },
        },
      },
      responses: {
        '204': { description: 'E-mail enviado (sem corpo na resposta).' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '404': {
          description: 'E-mail não cadastrado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: { status: 'error', message: 'User not found.' },
            },
          },
        },
      },
    },
  },
  '/password/reset': {
    post: {
      tags: ['Senha'],
      summary: 'Redefine a senha usando o token recebido por e-mail',
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ResetPasswordBody' },
          },
        },
      },
      responses: {
        '204': { description: 'Senha redefinida (sem corpo na resposta).' },
        '400': { $ref: '#/components/responses/ValidationError' },
        '404': {
          description: 'Token inválido ou expirado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
              example: {
                status: 'error',
                message: 'User token does not exists.',
              },
            },
          },
        },
      },
    },
  },
};

export default passwordPaths;
