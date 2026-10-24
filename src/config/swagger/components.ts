const components = {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Informe apenas o token, sem o prefixo "Bearer".',
    },
  },
  parameters: {
    PageParam: {
      name: 'page',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, default: 1 },
      description: 'Número da página (1-based).',
    },
    LimitParam: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, default: 10 },
      description: 'Registros por página.',
    },
    IdParam: {
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  },
  responses: {
    Unauthorized: {
      description: 'Token JWT ausente, inválido ou expirado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: { status: 'error', message: 'JWT token is missing.' },
        },
      },
    },
    NotFound: {
      description: 'Recurso não encontrado.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: { status: 'error', message: 'Product not found.' },
        },
      },
    },
    Conflict: {
      description: 'Violação de unicidade (e-mail já cadastrado, etc.).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: { status: 'error', message: 'Email address already used.' },
        },
      },
    },
    ValidationError: {
      description: 'Falha de validação do celebrate/Joi.',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ValidationError' },
          example: {
            statusCode: 400,
            error: 'Bad Request',
            message: '"email" must be a valid email',
            validation: { source: 'body', keys: ['email'] },
          },
        },
      },
    },
    TooManyRequests: {
      description: 'Rate limit excedido (5 requisições por segundo por IP).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: { status: 'error', message: 'Too many requests.' },
        },
      },
    },
    ServiceUnavailable: {
      description: 'Store do rate limiter indisponível (Redis fora do ar).',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: { status: 'error', message: 'Rate limiter unavailable.' },
        },
      },
    },
  },
  schemas: {
    Error: {
      type: 'object',
      required: ['status', 'message'],
      properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Internal server error' },
      },
    },
    ValidationError: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', example: 400 },
        error: { type: 'string', example: 'Bad Request' },
        message: { type: 'string', example: '"name" is required' },
        validation: {
          type: 'object',
          properties: {
            source: { type: 'string', example: 'body' },
            keys: {
              type: 'array',
              items: { type: 'string' },
              example: ['name'],
            },
          },
        },
      },
    },
    PaginationMeta: {
      type: 'object',
      properties: {
        total: { type: 'integer', example: 42 },
        per_page: { type: 'integer', example: 10 },
        current_page: { type: 'integer', example: 1 },
        last_page: { type: 'integer', example: 5 },
      },
    },
    User: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', example: 'Rob' },
        email: { type: 'string', format: 'email', example: 'rob@example.com' },
        avatar: { type: 'string', nullable: true, example: 'a1b2c3-foto.png' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    SessionResponse: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/User' },
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
    Product: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', example: 'Notebook Dell' },
        price: { type: 'number', format: 'float', example: 4500.9 },
        quantity: { type: 'integer', example: 10 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    Customer: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', example: 'Maria Silva' },
        email: {
          type: 'string',
          format: 'email',
          example: 'maria@example.com',
        },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    OrderProduct: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        order_id: { type: 'string', format: 'uuid' },
        product_id: { type: 'string', format: 'uuid' },
        price: { type: 'number', format: 'float', example: 4500.9 },
        quantity: { type: 'integer', example: 2 },
        product: { $ref: '#/components/schemas/Product' },
      },
    },
    Order: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        customer_id: { type: 'string', format: 'uuid' },
        customer: { $ref: '#/components/schemas/Customer' },
        order_products: {
          type: 'array',
          items: { $ref: '#/components/schemas/OrderProduct' },
        },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    },
    CreateUserBody: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'Rob' },
        email: { type: 'string', format: 'email', example: 'rob@example.com' },
        password: { type: 'string', format: 'password', example: '123456' },
      },
    },
    CreateSessionBody: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email', example: 'rob@example.com' },
        password: { type: 'string', format: 'password', example: '123456' },
      },
    },
    UpdateProfileBody: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', example: 'Rob Atualizado' },
        email: { type: 'string', format: 'email', example: 'novo@example.com' },
        old_password: { type: 'string', format: 'password', example: '123456' },
        password: {
          type: 'string',
          format: 'password',
          minLength: 6,
          example: '654321',
        },
        password_confirmation: {
          type: 'string',
          format: 'password',
          example: '654321',
        },
      },
    },
    ForgotPasswordBody: {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string', format: 'email', example: 'rob@example.com' },
      },
    },
    ResetPasswordBody: {
      type: 'object',
      required: ['token', 'password', 'password_confirmation'],
      properties: {
        token: { type: 'string', example: 'a1b2c3d4e5f6' },
        password: {
          type: 'string',
          format: 'password',
          minLength: 6,
          example: '654321',
        },
        password_confirmation: {
          type: 'string',
          format: 'password',
          example: '654321',
        },
      },
    },
    CreateProductBody: {
      type: 'object',
      required: ['name', 'price', 'quantity'],
      properties: {
        name: { type: 'string', example: 'Notebook Dell' },
        price: { type: 'number', format: 'float', minimum: 0, example: 4500.9 },
        quantity: { type: 'integer', minimum: 0, example: 10 },
      },
    },
    UpdateProductBody: {
      type: 'object',
      required: ['name', 'price', 'quantity'],
      properties: {
        name: { type: 'string', example: 'Notebook Dell Inspiron' },
        price: { type: 'number', format: 'float', minimum: 0, example: 4899.9 },
        quantity: { type: 'integer', minimum: 0, example: 8 },
      },
    },
    CreateCustomerBody: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string', example: 'Maria Silva' },
        email: {
          type: 'string',
          format: 'email',
          example: 'maria@example.com',
        },
      },
    },
    CreateOrderBody: {
      type: 'object',
      required: ['products'],
      properties: {
        products: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            required: ['id', 'quantity'],
            properties: {
              id: { type: 'string', format: 'uuid' },
              quantity: { type: 'integer', minimum: 1, example: 2 },
            },
          },
        },
      },
    },
  },
};

export default components;
