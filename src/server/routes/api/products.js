import express from 'express'
// import Promise from 'bluebird'

import db from '../../controllers/database'
import routerResponse from '../../utilities/routerResponse'

const router = express.Router()

router
    .get('/', getProductData)
    .post('/', insertProductRecord)

module.exports = router

function getProductData(req, res, next) {
    let seriesQueryFilter = {
        include: [{
            model: db.Products,
            include: [
                { model: db.Descriptions },
                { model: db.Photos, attributes: { exclude: ['photoData'] } }
            ]
        }]
    }
    return db.Series.findAll(seriesQueryFilter)
        .then((productRecords) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: productRecords
            })
        })
        .catch((error) => {
            console.log(error)
            // return error object to the frontend
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'product series data query failure'
            })
        })
}

function insertProductRecord(req, res, next) {
    return db.sequelize
        .transaction((trx) => { // initiate a db transaction
            return db.Products
                .create({ // create a product record
                    serieId: req.body.serieId,
                    itemCode: req.body.itemCode,
                    name: req.body.name,
                    type: req.body.type
                }, { transaction: trx })
                // create a description record for the product
                .then((newProductRecord) => {
                    return db.Descriptions.create({
                        productId: newProductRecord.id,
                        text: req.body.text
                    }, { transaction: trx })
                })
                // register photos for the product
                .then((newDescriptionRecord) => {
                    return db.Photos.update({
                        productId: newDescriptionRecord.productId
                    }, {
                        where: {
                            deletedAt: null,
                            id: { $in: req.body.photoIds }
                        },
                        transaction: trx
                    })
                })
                .then(() => { // remove any unregistered photos
                    return db.Photos.destroy({
                        where: { productId: null },
                        transaction: trx
                    })
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
            console.log(error)
            // return error object to the frontend
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'insert product record failure'
            })
        })
}
