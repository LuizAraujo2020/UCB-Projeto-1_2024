module.exports = class ServerError extends Error {
    constructor() {
        super(`An Internal error occurred, please try again later.`)
        this.name = 'ServerError'
    }
}
