const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: "Path or resource not found!"
    })
}

module.exports = notFoundMiddleware;
