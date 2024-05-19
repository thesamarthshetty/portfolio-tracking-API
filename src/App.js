const express = require('express');
const Server = require('./Server');
const Routes = require('./routes/index')

const App = express()


App.use(express.json());
Routes.init(App)
Server(App)