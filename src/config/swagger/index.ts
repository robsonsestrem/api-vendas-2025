import components from './components';
import sessionsPaths from './paths/sessions';
import usersPaths from './paths/users';
import profilePaths from './paths/profile';
import passwordPaths from './paths/password';
import productsPaths from './paths/products';
import customersPaths from './paths/customers';
import ordersPaths from './paths/orders';

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'API Vendas',
    version: '1.0.0',
    description:
      'Documentação dos endpoints da API de vendas: usuários, sessões, perfil, senha, produtos, clientes e pedidos.',
  },
  servers: [
    {
      url: process.env.APP_API_URL || 'http://localhost:3333',
      description: 'Servidor da API',
    },
  ],
  tags: [
    { name: 'Sessões', description: 'Autenticação e emissão de token JWT' },
    { name: 'Usuários', description: 'Cadastro e consulta de usuários' },
    { name: 'Perfil', description: 'Dados e avatar do usuário autenticado' },
    { name: 'Senha', description: 'Recuperação de senha por e-mail' },
    { name: 'Produtos', description: 'CRUD de produtos' },
    { name: 'Clientes', description: 'CRUD de clientes' },
    { name: 'Pedidos', description: 'Criação e consulta de pedidos' },
  ],
  components,
  paths: {
    ...sessionsPaths,
    ...usersPaths,
    ...profilePaths,
    ...passwordPaths,
    ...productsPaths,
    ...customersPaths,
    ...ordersPaths,
  },
};

export default swaggerDocument;
