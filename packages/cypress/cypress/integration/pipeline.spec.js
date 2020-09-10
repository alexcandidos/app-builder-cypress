const TestBase = require('./test.base')
const ObjectTest = require('./app-builder/objects/object')

class Pipeline extends TestBase {
  constructor (config) {
    super(config)
    this.config = config
  }

  run () {
    ObjectTest.pipeline(this.config)
  }
}

module.exports = Pipeline
