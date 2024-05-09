const validator = require('validator')
class EmailValidator {
    isValid(email) {
        return validator.isEmail(email)
    }
} 

const makeSUT = () => {
    return new EmailValidator()
}

describe('Email Validator', () => { 
    test('Should return true if validator returns true', () => { 
        const sut = makeSUT
        const isEmailValid = sut.isValid('valid_emal@mail.com')

        expect(isEmailValid).toBe(true)
     })

     test('Should return false if validator returns false', () => { 
        validator.isEmailValid = false

         const sut = makeSUT
         const isEmailValid = sut.isValid('valid_emal@mai')
 
         expect(isEmailValid).toBe(false)
      })
 })