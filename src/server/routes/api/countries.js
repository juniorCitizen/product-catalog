import express from 'express'
import path from 'path'

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
    .get('/flags', (req, res, next) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/svg+xml',
            imagePath: path.resolve(`./dist/client/assets/images/flags/${req.query.country}.svg`)
        })
    })

module.exports = router
