module.exports = (req, res, next) => {
    const httpStatus = res.status || 500;

    return res.status(httpStatus)
        .send({
            status: httpStatus,
            message: err.message || "Internal server error"
        })
}