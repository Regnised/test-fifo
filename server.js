'use strict';

const SwaggerExpress = require('swagger-express-mw'),
    SwaggerUi = require('swagger-tools/middleware/swagger-ui');

const bodyParser = require('body-parser'),
    compression = require('compression'),
    path = require('path');

const DB = require('./config/database.config'),
    express = require('express'),
    app = express(),
    appConfig = {
        appRoot: __dirname
    };

app.use(bodyParser.json({limit: 10 * 1024 * 1024}));
app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res, next) => {
    if (req.originalUrl.match(/\/docs/g) || req.originalUrl.match(/\/api/g) || req.originalUrl.match(/\/api-docs/g)) {
        next();
    } else {
        res.sendFile(path.join(__dirname + '/dist/index.html'));
    }
});
app.use(compression());

SwaggerExpress.create(appConfig, (err, swaggerExpress) => {
    if (err) {
        throw err;
    }

    app.use((req, res, next) => {
        res._end = (obj, statusCode) => {
            if (!obj) {
                obj = {};
            }
            statusCode = statusCode || 200;

            if (obj instanceof Error || obj.statusCode) {

                const ServiceError = require('./config/error.config');
                if (!(obj instanceof ServiceError)) {
                    obj = new ServiceError(obj);
                }

                res.statusCode = obj.statusCode;
                let response = {
                    success: false,
                    message: obj.message,
                    errorCode: obj.errorCode,
                    errorStack: obj.errors
                };
                console.log('error', JSON.stringify(response));
                res.json(response);
                return;
            }

            res.statusCode = statusCode;

            res.json({
                success: statusCode >= 200 && statusCode <= 299,
                code: 1,
                data: obj
            });
        };
        next();
    });
    app.use((req, res, next) => {
        if (!req.swagger) {
            next();
            return;
        }

        let params = {};

        for (const param in req.swagger.params) {
            params[param] = req.swagger.params[param].value;
        }

        req.parameters = params;
        next();
    });

    app.use(SwaggerUi(swaggerExpress.runner.swagger));
    swaggerExpress.register(app);

    const port = process.env.PORT || 5100;
    app.listen(port, () => {
        console.log(`Server is working on ${port}`);
        DB.connect();
    });
});
