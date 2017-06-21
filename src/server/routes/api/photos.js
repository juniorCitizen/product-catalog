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

router.post('/', upload.array('prod-photo', null), (req, res) => {
    // console.log(req.files)
    let dbQueries = []
    req.files.forEach((file) => {
        dbQueries.push(
            db.Photos.create({
                originalName: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                size: file.size,
                photoData: fs.readFileSync(file.path)
            })
        )
    })
    return Promise.all(dbQueries)
        .then((dbQueryResult) => {
            req.files.forEach((file) => {
                del.sync(file.path)
            })
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: dbQueryResult
            })
        })
        .catch((error) => {
            // console.log(error)
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'photo upload error'
            })
        })
})

module.exports = router
