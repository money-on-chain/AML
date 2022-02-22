import Validator from './src/validator.js'

let validator = new Validator()
console.log('Start AML service validation addresses... \n\n')
await validator.main()
console.log('Finish AML service validation addresses')
