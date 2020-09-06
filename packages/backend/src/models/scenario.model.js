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
        name: Object
      },
      tableView: {
        name: Object,
        selectedFields: Array
      },
      environment: {
        endpoint: String,
      }
})

module.exports = model('scenario', Scenario)
