import eVars from '../../config/environment'
import routerResponse from '../../utilities/routerResponse'

module.exports = (request, response, next) => {
    return routerResponse.json({
        pendingResponse: response,
        originalRequest: request,
        statusCode: 501,
        success: false,
        message: `${request.protocol}://${request.hostname}:${eVars.PORT}${request.originalUrl} has not been implemented`
    })
}
