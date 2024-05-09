const { ServerError, UnauthorizedError } = require('../errors')

module.exports = class HTTPStatusCode {
    static ok(data) {
        return {
            statusCode: 200,
            body: data
        }
    }

    static badRequest(error) {
        return {
            statusCode: 400,
            body: error
        }
    }

    static unauthorized() {
        return {
            statusCode: 401,
            body: new UnauthorizedError()
        }
    }

    static internalServer() {
        return {
            statusCode: 500,
            body: new ServerError()
        }
    }
}