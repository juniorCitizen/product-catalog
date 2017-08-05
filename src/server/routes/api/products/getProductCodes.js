import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

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

module.exports = getProductCodes
