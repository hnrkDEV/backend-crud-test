const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'CRUD API for Product Management'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'local server',
      },
    ],
    components: {
  schemas: {
    Product: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          example: '66545e2b8f7df9c6b01b2a7c'
        },
        name: {
          type: 'string',
          example: 'Camiseta'
        },
        price: {
          type: 'number',
          example: 49.9
        },
        category: {
          type: 'string',
          example: 'Roupas'
        },
        inStock: {
          type: 'boolean',
          example: true
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          example: '2024-05-27T13:45:00Z'
        }
      }
    }
  }
}
  },
  apis: ['src/docs/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
