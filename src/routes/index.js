//const express = require('express');
const ResponseBody = require('../lib/ResponseBody');
const portfolioRouter = require('./Portfolio');
const customerRouter = require('./Customer');

const Routes = [
    { path: '/portfolio', router: portfolioRouter },
    { path: '/customer', router: customerRouter }
];

Routes.init = (app) => {
    Routes.forEach(route => app.use(route.path, route.router));

    app.get('/health-check', (req, res, next) => {
        const responseBody = new ResponseBody(200, 'Success');
        res.status(responseBody.statusCode).json(responseBody);
    });
};

module.exports = Routes;
