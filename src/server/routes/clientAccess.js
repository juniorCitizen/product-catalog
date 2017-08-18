import express from 'express'
import path from 'path'

import eVars from '../config/environment'
import routerResponse from '../controllers/routerResponse'

const router = express.Router()

const productionMode = eVars.NODE_ENV === 'production'

router
    .get('/', (req, res) => {
        let titleString = null
        titleString = productionMode ? 'Gentry Way Co., Ltd.' : '(DEV) Gentry Way Co., Ltd.'
        return routerResponse.template({
            pendingResponse: res,
            statusCode: 200,
            viewToRender: 'index',
            data: {
                title: titleString,
                styleSource: productionMode ? `${eVars.PROD_HOST}/${eVars.SYS_REF}/style/app.css` : '',
                scriptSource: `${productionMode ? eVars.PROD_HOST : eVars.REMOTE_DEV_HOST}/${eVars.SYS_REF}/lib/app.js`
            }
        })
    })
    .get('/style/app.css', (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'css',
            filePath: path.resolve(`./dist/server/client/style/app.css`)
        })
    })
    .get('/lib/app.js', (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'javascript',
            filePath: path.resolve(`./dist/server/client/lib/app.js`)
        })
    })
    .get('/assets/gentryLogo.png', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/png',
            imagePath: path.resolve(`./dist/server/client/assets/gentryLogo.png`)
        })
    })
    .get('/assets/gentryLogoSmall.png', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/png',
            imagePath: path.resolve(`./dist/server/client/assets/gentryLogoSmall.png`)
        })
    })

module.exports = router
