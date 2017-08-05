import Promise from 'bluebird'

import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

function deleteProductRecord(req, res, next) {
    return db.sequelize
        .transaction((trx) => {
            let filterCondition = {
                where: { productId: req.query.productId }
            }
            let trxObj = { transaction: trx }
            let deletePhotos = db.Photos.destroy(filterCondition, trxObj)
            let deleteDescriptions = db.Descriptions.destroy(filterCondition, trxObj)
            return Promise.all([deletePhotos, deleteDescriptions])
                .then(() => {
                    filterCondition = {
                        where: { id: req.query.productId }
                    }
                    return db.Products.destroy(filterCondition, trxObj)
                })
        })
        .then(() => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true
            })
        })
        .catch((error) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'failed to create new product record'
            })
        })
}

module.exports = deleteProductRecord
