
const sendResponse = (response, message, statusCode = 200) => {
    if(message) {
        return response.status(statusCode).json({
            status: statusCode < 300 ? "success": "failed",
            message: message
        })
    }
}

module.exports = {sendResponse};
