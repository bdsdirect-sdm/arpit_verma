const app = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


 const apiDoc  = app=>{
    const options = {
        swaggerDefinition:{
            swagger: "2.0",
            info: {
                title: "Project",
                version: "0.0.2",
            },
            host: "localhost:3000",
            basepath: "/",
            securityDefinition: {
                basicAuth: {
                    type: 'basic',
                    name: 'authorization'
                },
                key: {
                    type: 'apiKey',
                    in: 'query',
                    name: 'api_key'
                }
            },
            tags: [
                {
                    name:'Authentication',
                }
            ],
            schemes: ["http","https"],
        },
        apis: ["users/*.yaml"],
    };
    const swaggerSpec = swaggerJSDoc(options);
    app.use("/project", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
module.exports = apiDoc(app);