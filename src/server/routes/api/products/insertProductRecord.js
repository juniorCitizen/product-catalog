import del from 'del'
import fs from 'fs'
import Promise from 'bluebird'

import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

function insertProductRecord(req, res, next) {
    // console.log(req.files)
    // console.log(req.body)
    let productRecordData = {
        seriesId: req.body.seriesId,
        itemCode: req.body.itemCode,
        name: req.body.name,
        type: req.body.type
    }
    return db.sequelize
        .transaction((trx) => { // initiate a db transaction
            let trxObj = { transaction: trx }
            return db // create record in products table
                .Products.create(productRecordData, trxObj)
                .then((newProductRecord) => {
                    let descriptionRecordData = {
                        productId: newProductRecord.id,
                        text: req.body.text
                    }
                    // create description record
                    return db.Descriptions.create(descriptionRecordData, trxObj)
                })
                .then((newDescriptionRecord) => {
                    let photoQueries = []
                    // deal with primary photo
                    let primaryPhoto = req.files.primaryPhoto[0]
                    photoQueries.push(db.Photos.create({
                        productId: newDescriptionRecord.productId,
                        originalName: primaryPhoto.originalname,
                        encoding: primaryPhoto.encoding,
                        mimeType: primaryPhoto.mimetype,
                        size: primaryPhoto.size,
                        primaryImage: true,
                        // write photo data to the blob field
                        photoData: fs.readFileSync(primaryPhoto.path)
                    }, trxObj))
                    // deal with secondary photos
                    req.files.secondaryPhotos.forEach((secondaryPhoto) => {
                        photoQueries.push(db.Photos.create({
                            productId: newDescriptionRecord.productId,
                            originalName: secondaryPhoto.originalname,
                            encoding: secondaryPhoto.encoding,
                            mimeType: secondaryPhoto.mimetype,
                            size: secondaryPhoto.size,
                            primaryImage: false,
                            // write photo data to the blob field
                            photoData: fs.readFileSync(secondaryPhoto.path)
                        }, trxObj))
                    })
                    return Promise.all(photoQueries)
                })
                .then(() => {
                    return del(['./dist/server/upload/**', '!./dist/server/upload'])
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
                message: 'failed to create new product record'
            })
        })
}

module.exports = insertProductRecord
