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
    let photoPath = null
    return db.Photos
        .find({ where: { id: req.query.photoId } })
        .then((photo) => {
            console.log(photo.dataValues)
            photoPath = `./dist/client/temp/${photo.originalName}`
            fs.createReadStream(photo.photoData).pipe(fs.createWriteStream(photoPath))
            return res
                .status(200)
                .header('Content-Type: Image')
                .sendFile(photoPath)
                .end()
        })
        .catch((error) => {
            return res.status(500).json(error).end()
        })
        .finally(() => {
            del.sync(photoPath)
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
                mimetype: file.mimetype,
                size: file.size,
                photoData: fs.readFileSync(file.path) // actual photo data is written to a blob field
            })
        )
    })
    return Promise.all(dbQueries) // run the queries
        .then((dbQueryResult) => {
            req.files.forEach((file) => { // remove all the left over photos
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
