const routes = require('express').Router()
const Scenario = require('./controllers/scenario.controller')

routes.get('/scenario', Scenario.index) 
routes.post('/scenario', Scenario.store) 

module.exports = routes;
