const { USER } = require('./models/index');
const { Route } = require("./routes");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.1',
    servers: [
        {
            url: 'http://localhost:80',
            description: 'Local server'
        }
    ],
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Fil rouge description',
        termsOfService: '',
        contact: {
            name: 'Fil rouge',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    }
}

const options = {
    swaggerDefinition,
    apis: ['./routes/index.js'],
}

const swaggerSpec = swaggerJSDoc(options);

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.listen(80, () => console.log("serveur on port :", 80));
app.use('', Route);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//USER.findAll().then((result) => console.log("result", result));