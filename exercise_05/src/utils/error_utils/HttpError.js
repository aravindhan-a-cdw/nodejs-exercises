
/**
 * A class for sending error
 * @param {string|null} name Type of http error
 * @param {string|null} message Message to be shown to the end user
 * @param {Number} status Status code to be sent in the response
 */
class HTTPError extends Error {

    /**
     * 
     * @param {string|null} name Type of http error
     * @param {string|null} message Message to be shown to the end user
     * @param {Number} status Status code to be sent in the response
     */
    constructor(name = null, message = null, status = 500) {
        super(name, message);
        this.status = status;
    }

    json = () => {
        return {
            "status": "failed",
            "message": this.message,
        }
    }
}

module.exports = HTTPError