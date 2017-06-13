import routerResponse from '../../utilities/routerResponse'

// middleware to filter and error out when unsupported methods are found in the request
module.exports = (request, response, next) => {
    const supportedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    if ((supportedMethods.indexOf(request.method.toUpperCase())) === -1) {
        return routerResponse.json({
            pendingResponse: response,
            originalRequest: request,
            statusCode: 405,
            success: false,
            message: `http method ${request.method} is not supported`
        })
    }
    next()
}
