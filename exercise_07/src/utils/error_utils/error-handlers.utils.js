
const handleError = (res, error, statusCode) => {
    res.status(statusCode).json({
        status: "failed",
        message: error
    })
}

module.exports = {
    handleError
}