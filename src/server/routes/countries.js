import express from 'express'
import path from 'path'

import db from '../controllers/database'
import routerResponse from '../controllers/routerResponse'

const router = express.Router()

router
    .get('/', (req, res) => {
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
    .get('/regions', (req, res) => {
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
                    message: 'world region data access failure'
                })
            })
    })
    .get('/flags', (req, res) => {
        return routerResponse.image({
            pendingResponse: res,
            statusCode: 200,
            mimeType: 'image/svg+xml',
            imagePath: path.resolve(`./dist/server/client/assets/${req.query.country}.svg`)
        })
    })

module.exports = router
