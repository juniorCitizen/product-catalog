import express from 'express'
import path from 'path'

import eVars from '../config/environment'
import routerResponse from '../controllers/routerResponse'

const router = express.Router()

const productionMode = eVars.NODE_ENV === 'production'

const appScriptEndPoint = '/lib/app.js'
const appStyleEndPoint = '/style/app.css'

router
    .get('/favicon.ico', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/x-icon',
            filePath: path.join(__dirname, '../client/assets/favicon.ico')
        })
    })
    .get('/', (req, res) => {
        let titleString = null
        titleString = productionMode ? 'Gentry Way Co., Ltd.' : '(DEV) Gentry Way Co., Ltd.'
        return routerResponse.template({
            pendingResponse: res,
            statusCode: 200,
            view: 'index',
            data: {
                title: titleString,
                favicon: `${productionMode ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/favicon.ico`,
                styleSource: productionMode ? `${eVars.PROD_HOST}/${eVars.SYS_REF}${appStyleEndPoint}` : '',
                scriptSource: `${productionMode ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}${appScriptEndPoint}`
            }
        })
    })
    .get(appScriptEndPoint, (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'javascript',
            filePath: path.join(__dirname, '../client/lib/app.js')
        })
    })
    .get('/assets/gentryLogoSmall.png', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/png',
            filePath: path.join(__dirname, '../client/assets/gentryLogoSmall.png')
        })
    })
    .get(appStyleEndPoint, (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'css',
            filePath: path.join(__dirname, '../client/style/app.css')
        })
    })
    .get('/assets/gentryLogo.png', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/png',
            filePath: path.join(__dirname, '../client/assets/gentryLogo.png')
        })
    })

module.exports = router
