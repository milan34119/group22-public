import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travelblog API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            format: 'int64',
                        },
                        name: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        password: {
                            type: 'string',
                            description: 'User password (should not be exposed in responses)',
                        },
                        posts: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Post',
                            },
                        },
                    },
                    required: ['id', 'name', 'email', 'password'],
                },
                Post: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            format: 'int64',
                        },
                        title: {
                            type: 'string',
                        },
                        content: {
                            type: 'string',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                    required: ['id', 'title', 'content'],
                },
            },
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
