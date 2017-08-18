import express from 'express'

import db from '../../controllers/database'
import routerResponse from '../../controllers/routerResponse'

const router = express.Router()

router
    .route('/series')
    .get((req, res) => {
        return db.Series
            .findAll()
            .then((data) => {
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 200,
                    success: true,
                    data: data
                })
            })
            .catch((error) => {
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 500,
                    success: false,
                    error: error,
                    message: 'database access error'
                })
            })
    })

module.exports = router
