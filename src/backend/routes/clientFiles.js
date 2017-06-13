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
                title: 'Gentry-Way Product Catalog',
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF,
                cssPlaceholder: eVars.NODE_ENV === 'production' ? './app.css' : ''
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

router.route('/app.css')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/app.css')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

router.route('/jquery.min.js')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/jquery.min.js')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

router.route('/foundation.min.js')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/foundation.min.js')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

router.route('/dist/sourcemaps/app.js.map')
    .get((request, response, next) => {
        return routerResponse.file({
            pendingResponse: response,
            statusCode: 200,
            filePath: path.join(__dirname, '../../client/dist/sourcemaps/app.js.map')
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

// TODO add a route for source maps (due to sourcemap isn't actually working, it's not implemented)

module.exports = router
