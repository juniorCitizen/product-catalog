import express from 'express'
import path from 'path'

import eVars from '../config/environment'
import routerResponse from '../utilities/routerResponse'

// middleware
import notImplemented from '../middlewares/preprocessing/notImplemented'

const router = express.Router()

router.route('/')
    .get((request, response, next) => {
        return routerResponse.template({
            pendingResponse: response,
            statusCode: 200,
            reference: 'index.hbs',
            data: {
                title: 'Gentry-Way Co. Ltd',
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF
            }
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

router.route('/app.js')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/app.js')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

router.route('/app.js.map')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/app.js.map')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

module.exports = router
