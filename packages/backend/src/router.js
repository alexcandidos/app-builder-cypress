const routes = require('express').Router()
const Scenario = require('./controllers/scenario.controller')

routes.get('/sync', Scenario.sync) 
routes.get('/scenario', Scenario.index) 
routes.get('/scenario/:id', Scenario.get) 
routes.put('/scenario/:id', Scenario.update) 
routes.post('/scenario', Scenario.store) 
routes.post('/scenario/duplicate/:id', Scenario.duplicate) 
routes.delete('/scenario/:id', Scenario.destroy) 

module.exports = routes;
