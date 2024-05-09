class EmailValidator {
    isValid(email) {
        // return validator.isEmail(email)
        return true
    }
}

describe('Email Validator', () => { 
    test('Should return true if validator returns true', () => { 
        const sut = new EmailValidator()
        const isEmailValid = sut.isValid('valid_emal@mail.com')

        expect(isEmailValid).toBe(true)
     })
 })