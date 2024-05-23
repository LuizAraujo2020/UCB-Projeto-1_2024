const EmailValidator = require('./email-validator') 
const validator = require('validator')

const makeSUT = () => {
    return new EmailValidator()
}

describe('Email Validator', () => { 
    test('Should return true if validator returns true', () => { 
        const sut = makeSUT()
        const isEmailValid = sut.isValid('valid_emal@mail.com')

        expect(isEmailValid).toBe(true)
     })

    test('Should return false if validator returns false', () => { 
        validator.isEmailValid = false

        const sut = makeSUT()
        const isEmailValid = sut.isValid('valid_emal@mail.com')

        expect(isEmailValid).toBe(false)
    })

    test('Should call validator with correct email', () => { 
        const sut = makeSUT()
        sut.isValid('any_email@email.com')

        expect(validator.email).toBe('any_email@email.com')
    })
 })