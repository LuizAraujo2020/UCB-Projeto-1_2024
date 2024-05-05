const MissingParamError = require('./missing-param-error')

module.exports = class HTTPStatusCode {
    static badRequest(paramName) {
        return {
            statusCode: 400,
            body: new MissingParamError(paramName)
        }
    }

    static internalServer() {
        return {
            statusCode: 500
        }
    }
}