const constants = require('./helpers/constants')
const SignIn = require('./portal/sign-in')
const AppBuilderObject = require('./app-builder/objects/1.object')

class Relevant {
  constructor () {
    this.constants = constants
  }

  signIn () {
    SignIn.test()
  }

  run () {
    // SignIn.test()
    AppBuilderObject.test()
  }
}

const RelevantRunner = new Relevant()

RelevantRunner.run()
