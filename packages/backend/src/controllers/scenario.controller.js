const Scenario = require('../models/scenario.model')

module.exports = {
   async index(req, res) {
        const data = await Scenario.find()
        res.send({data})
    },
    async store(req, res) {
        const {scenario} = req.body;
        const data = await Scenario.create(scenario);
        res.send(data);
    }
}
