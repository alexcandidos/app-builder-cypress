const {model, Schema} = require('mongoose')

const Scenario = new Schema({
    app: {
        config: {
          product: Boolean,
          standalone: Boolean,
          widget: Boolean
        },
        name: Object
      },
      formView: {
        fieldTypes: Array,
        name: Object
      },
      object: {
        name: String
      },
      tableView: {
        name: Object,
        selectedFields: Array
      },
      settings: {
        endpoint: String,
        customEndpoint: String,
        testName: String,
        testDescription: String,
        defaultLanguageId: {type: String, default: 'en_US'},
        languageId: {type: String, default: 'en_US'},
      }
})

module.exports = model('scenario', Scenario)
