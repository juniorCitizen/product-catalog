import jwt from 'jsonwebtoken'

import routerResponse from '../../utilities/routerResponse.js'
import eVars from '../../config/environment.js'

module.exports = (request, response, next) => {
    if (eVars.VALIDATE !== 'enforced') {
        console.log('system had been setup to skip token validation')
        console.log('please confirm if the following are correct')
        console.log(`VALIDATE=${eVars.VALIDATE}`)
        next()
    } else {
        let accessToken =
            (request.body && request.body.accessToken) ||
            (request.query && request.query.accessToken) ||
            request.headers['x-access-token']
        if (accessToken) { // if a token is found
            jwt.verify(accessToken, eVars.PASS_PHRASE, (error, decodedToken) => {
                if (error) {
                    return routerResponse.json({
                        pendingResponse: response,
                        originalRequest: request,
                        statusCode: 401,
                        success: false,
                        message: `${response.statusCode} Unauthorized (unrecognized token)`
                    })
                }
                next()
            })
        } else { // if there is no token, return an error
            return routerResponse.json({
                pendingResponse: response,
                originalRequest: request,
                statusCode: 403,
                success: false,
                message: `${response.statusCode} Forbidden (lost token)`
            })
        }
    }
}
