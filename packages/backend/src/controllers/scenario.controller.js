const Scenario = require('../models/scenario.model')
const fs = require('fs')
const path = require('path')
const {string_to_slug} = require('../helpers/util')
const { syncIndexes } = require('../models/scenario.model')

module.exports = {
    async destroy(req, res) {
        const {id} = req.params;
        await Scenario.findByIdAndDelete(id);
        res.send({message: 'Scenario deleted with success'})
    },
   async index(req, res) {
        const data = await Scenario.find()
        res.send({data})
    },
    async get(req, res) {
        const {id} = req.params;
        try {
            const scenario = await Scenario.findById(id);
            res.send({scenario});
        } catch (err) {
            res.send({message: 'Id not exists'})
        }
    },
    async update(req, res) {
        const {id} = req.params;
        const body = req.body
        try {
            const scenario = await Scenario.findByIdAndUpdate(id, body);
            res.send({scenario: scenario});
        } catch (err) {
            res.send({message: 'Id not exists'})
        }
    },
    async store(req, res) {
        const scenario = req.body;
        const data = await Scenario.create(scenario);
        res.send(data);
    },
    async sync(req, res){ 
        const scenarios = await Scenario.find().lean();

        for (const scenario of scenarios) {
            const {settings: {testName}} = scenario;
            const fileName = string_to_slug(testName);
            const cypressFolder = path.resolve(
                __dirname, 
                '..', 
                '..', 
                '..', 
                'cypress', 
                'cypress'
            );

            const jsonPath = path.resolve(
                cypressFolder,
                'fixtures', 
                'solo', 
                `${fileName}.json`
            );

            const testPath = path.resolve(
                cypressFolder,
                'integration',
                'scenarios',
                'solo',
                `${fileName}.spec.js`
            )
            
            await fs.writeFileSync(jsonPath, JSON.stringify(scenario));
            await fs.writeFileSync(testPath, `const scenario = require('../../../fixtures/solo/${fileName}.json')\nconst Pipeline = require('../../pipeline.spec')\nconst SignIn = require('../../portal/sign-in')\nconst pipeline = new Pipeline(scenario) \nSignIn.test() \npipeline.run()`.trim())
        }

        res.send({message: 'Sync Complete'})
    }
}
