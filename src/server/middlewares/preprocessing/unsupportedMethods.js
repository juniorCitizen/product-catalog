import express from 'express'
import jwt from 'jsonwebtoken'

import db from '../controllers/database.js'
import eVars from '../config/environment.js'
import encryption from '../utilities/encryption.js'
import routerResponse from '../utilities/routerResponse.js'

import notImplemented from '../middleware/preprocessing/notImplemented.js'

const tokenRouter = express.Router()

tokenRouter.route('/api/getToken')
    .get(notImplemented)
    .post(getToken) // verify and issue token
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

module.exports = tokenRouter

function getToken(request, response, next) {
    let loginId = request.body.loginId
    let password = request.body.password
    if ((!loginId) || (!password)) {
        return routerResponse.json({
            pendingResponse: response,
            originalRequest: request,
            statusCode: 401,
            success: false,
            message: 'required login information missing'
        })
    }
    db.Subscribers
        .findOne({ where: { loginId: loginId } })
        .then((apiUser) => {
            // reject the request if such user does not exist
            if (apiUser === null) {
                return routerResponse.json({
                    pendingResponse: response,
                    originalRequest: request,
                    statusCode: 401,
                    success: false,
                    message: 'no matching user'
                })
            }
            // hash the submitted password against the salt string
            let currentHash = encryption.sha512(password, apiUser.salt).passwordHash
            // compare with the stored hash
            if (currentHash === apiUser.passwordHash) { // hash verified
                let payload = { loginId: loginId }
                routerResponse.json({
                    pendingResponse: response,
                    originalRequest: request,
                    statusCode: 200,
                    success: true,
                    data: {
                        token: jwt.sign(payload, eVars.PASS_PHRASE, { expiresIn: '24h' })
                    },
                    message: 'token is supplied for 24 hours'
                })
            } else { // hash verification failed
                return routerResponse.json({
                    pendingResponse: response,
                    originalRequest: request,
                    statusCode: 401,
                    success: false,
                    message: 'incorrect credentials'
                })
            }
        }).catch((error) => {
            return routerResponse.json({
                pendingResponse: response,
                originalRequest: request,
                statusCode: 500,
                success: false,
                error: error,
                message: 'server failure'
            })
        })
}
