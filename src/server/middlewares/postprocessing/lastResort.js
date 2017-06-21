import routerResponse from '../../utilities/routerResponse.js'

// last resort middleware error handling function
module.exports = (error, request, response, next) => {
    console.log('CAUGHT BY LAST RESORT')
    return routerResponse.json({
        pendingResponse: response,
        originalRequest: request,
        statusCode: 500,
        success: false,
        error: error,
        message: 'this request was handled by the last resort'
    })
}
