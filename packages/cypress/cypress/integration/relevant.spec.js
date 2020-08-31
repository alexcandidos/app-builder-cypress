const constants = require('./helpers/constants')
const SignIn = require('./portal/sign-in')
const AppBuilderObject = require('./app-builder/objects/1.object')
const Language = require('./portal/language')

class Relevant {
  constructor () {
    this.constants = constants
  }

  signIn () {
    SignIn.test()
  }

  run () {
    const languageModule = new Language()
    // SignIn.test()
    // languageModule.run()
    AppBuilderObject.test()
  }
}

const RelevantRunner = new Relevant()

RelevantRunner.run()
