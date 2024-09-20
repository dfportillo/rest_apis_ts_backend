import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.1.0',
        tags: [
            {
                name: "Products",
                description: "api operations related to products"
            },
        
        ],
        info: {
            title: 'res API node.js / Express / typescript',
            version: '1.0.0',
            description: 'API Docs for products'
        }
    },
    apis: ['./src/routes.ts'],
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions:SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('../../public/logo.svg');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: grey
        }
    `,
    customSiteTitle: 'Documentacion rest api express ts'
}

export default swaggerSpec ; 
export {
    swaggerUiOptions
}

