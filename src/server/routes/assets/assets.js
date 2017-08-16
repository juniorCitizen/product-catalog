import express from 'express'
import path from 'path'

import eVars from '../../config/environment'
import routerResponse from '../../utilities/routerResponse'

const router = express.Router()

router
    .get('/', (req, res) => {
        let titleString = null
        if (eVars.NODE_ENV === 'production') {
            titleString = 'Gentry Way Co., Ltd.'
        } else {
            titleString = '(DEV) Gentry Way Co., Ltd.'
        }
        return routerResponse.template({
            pendingResponse: res,
            statusCode: 200,
            viewToRender: 'index',
            data: {
                title: titleString,
                styleSource: `${eVars.HOST}/style/app.css`,
                scriptSource: `${eVars.HOST}/lib/app.js`
            }
        })
    })
    .get('/style/app.css', (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'css',
            filePath: path.resolve('./dist/client/style/app.css')
        })
    })
    .get('/lib/app.js', (req, res) => {
        return routerResponse.file({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'javascript',
            filePath: path.resolve('./dist/client/lib/app.js')
        })
    })
    .get('/assets/images/gentryLogo.png', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/png',
            imagePath: path.resolve('./dist/client/assets/images/gentryLogo.png')
        })
    })

module.exports = router
