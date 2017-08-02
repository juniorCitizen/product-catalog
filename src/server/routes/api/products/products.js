import express from 'express'
import multer from 'multer'
import path from 'path'

import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

const router = express.Router()
const upload = multer({ dest: path.resolve('./dist/server/upload/') })

router
    .get('/', require('./getProductData'))
    .get('/productCodes', getProductCodes)
    .post('/',
        upload.fields([
            { name: 'primaryPhoto', maxCount: 1 },
            { name: 'secondaryPhotos', maxCount: 30 }
        ]),
        require('./insertProductRecord'))

module.exports = router

function getProductCodes(req, res, next) {
    let seriesId = req.query.seriesId
    let itemCode = req.query.itemCode
    db.Products
        .findAll({
            where: {
                seriesId: seriesId,
                itemCode: {
                    $like: `%${itemCode}%`
                }
            }
        })
        .then((searchResults) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: searchResults
            })
        })
        .catch((error) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                erro: error,
                message: 'error accessing product codes from database'
            })
        })
}
