import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const apiDoc = (app: express.Application): void => {
    const options = {
        swaggerDefinition: {
            swagger: "2.0",
            info: {
                title: "Project",
                version: "0.0.2",
            },
            host: "localhost:3000",
            basePath: "/", 
            securityDefinitions: { 
                basicAuth: {
                    type: 'basic',
                    name: 'authorization',
                },
                key: {
                    type: 'apiKey',
                    in: 'query',
                    name: 'api_key',
                },
            },
            tags: [
                {
                    name: 'userDetails',
                },
            ],
            schemes: ["http", "https"],
        },
        apis: ["*.yaml"],
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.use("/project", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default apiDoc;
