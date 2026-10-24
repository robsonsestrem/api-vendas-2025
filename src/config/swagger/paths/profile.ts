const profilePaths = {
  '/profile': {
    get: {
      tags: ['Perfil'],
      summary: 'Retorna o perfil do usuário autenticado',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Perfil do usuário.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
      },
    },
    put: {
      tags: ['Perfil'],
      summary: 'Atualiza nome, e-mail e/ou senha do usuário autenticado',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateProfileBody' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Perfil atualizado.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': { $ref: '#/components/responses/ValidationError' },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '409': { $ref: '#/components/responses/Conflict' },
      },
    },
  },
};

export default profilePaths;
