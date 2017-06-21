import routerResponse from '../../utilities/routerResponse.js'

// middleware functions to deal with reqeusts that falls through all available handlers
module.exports = (request, response, next) => {
    console.log('CAUGHT BY FELL TRHOUGH')
    if (response.statusCode === 404) {
        return routerResponse.json({
            pendingResponse: response,
            originalRequest: request,
            statusCode: response.statusCode,
            success: false,
            message: 'the request was not handled'
        })
    } else {
        next('the request was not handled')
    }
}
