// preset all requests to status 404
// in case the requests falls through all route handlers
// will still be caught at the end

module.exports = (request, response, next) => {
    response.status(404)
    next()
}
