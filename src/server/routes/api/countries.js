import express from 'express'

import db from '../../controllers/database'
import routerResponse from '../../utilities/routerResponse'

const router = express.Router()

router
    .get('/', (req, res, next) => {
        return db.Countries
            .findAll({
                order: [
                    ['name']
                ]
            })
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
    .get('/regions', (req, res, next) => {
        return db.Countries
            .findAll({
                attributes: ['region'],
                group: 'region'
            })
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
