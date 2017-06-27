import del from 'del'
import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import Promise from 'bluebird'

import db from '../../controllers/database'
import routerResponse from '../../utilities/routerResponse'

const router = express.Router()
const upload = multer({ dest: path.resolve('./dist/client/upload/') })

router
    .get('/', retrievePhoto)
    .post('/', upload.array('prod-photo', null), processPhotoUploads)

module.exports = router

function retrievePhoto(req, res, next) {
    let imagePath = null
    return db.Photos
        .find({ where: { id: req.query.photoId } })
        .then((photo) => {
            if (photo === null) { // promise is rejected if the photoId does not exist
                let error = new Error('image not found')
                error.name = 'imageIdNotFound'
                return Promise.reject(error)
            }
            // path to write the image file
            imagePath = path.join(path.resolve('./dist/client/assets/images'), photo.id)
            // extra the image from db and write into the file
            fs.writeFileSync(imagePath, Buffer.from(photo.photoData))
            return routerResponse.image({ // return photo to client
                pendingResponse: res,
                statusCode: 200,
                mimeType: photo.mimeType,
                imagePath: imagePath
            })
        })
        .catch((error) => {
            // return error object to the frontend
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'photo retrieval failure'
            })
        })
}

// deal with photo uploads and place inside the database
function processPhotoUploads(req, res, next) {
    let dbQueries = [] // array to hold queries that writes photo to database
    req.files.forEach((file) => { // place all uploads into the array
        dbQueries.push(
            db.Photos.create({ // sequelize insert query
                originalName: file.originalname,
                encoding: file.encoding,
                mimeType: file.mimetype,
                size: file.size,
                photoData: fs.readFileSync(file.path) // write photo data to the blob field
            })
        )
    })
    // remove all rouge photo
    return db.Photos.destroy({ where: { productId: null } })
        .then(() => {
            // run the photo insert queries
            return Promise.all(dbQueries)
        })
        .then((dbQueryResult) => {
            // remove all the left over photos
            req.files.forEach((file) => {
                del.sync(file.path)
            })
            return routerResponse.json({ // return a successful photo upload
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: dbQueryResult // actual data return by the insert queries about the photo records
            })
        })
        .catch((error) => {
            return routerResponse.json({ // return error object to the frontend when the photo upload had failed
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'photo upload error'
            })
        })
}
