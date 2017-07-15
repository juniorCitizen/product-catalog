import express from 'express'

import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

const router = express.Router()

router
    .get('/', require('./getProductData'))
    .get('/productCodes', getProductCodes)
    .post('/', require('./insertProductRecord'))

module.exports = router

function getProductCodes(req, res, next) {
    let serieId = req.query.serieId
    let itemCode = req.query.itemCode
    db.Products
        .findAll({
            where: {
                serieId: serieId,
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
