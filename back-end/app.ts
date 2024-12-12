import * as dotenv from 'dotenv';
import express, { NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import postRouter from './controller/post.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'default_secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/user/login', '/user/registration'],
    })
);

app.use('/user', userRouter);
app.use('/post', postRouter);

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

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({ status: 'application error', message: err.message });
//     } else {
//         res.status(400).json({ status: 'application error', message: err.message });
//     }
// });

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
