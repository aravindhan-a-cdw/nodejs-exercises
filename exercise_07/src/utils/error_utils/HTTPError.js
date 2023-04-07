

/**
 * A class to create HTTPError
 */
class HTTPError extends Error {

    /**
     * 
     * @param {String | null} message Message about the http error
     * @param {String | null} name A Name for the error
     * @param {Number} statusCode Status code denoting the error
     */
    constructor(message = null, name = 'Error', statusCode = 500) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }

    json() {
        return {
            name: this.name,
            message: this.message,
            statusCode: this.statusCode
        }
    }
}

module.exports = HTTPError;