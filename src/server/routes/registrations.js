import express from 'express'

import db from '../controllers/database'
import routerResponse from '../controllers/routerResponse'

const router = express.Router()

router
    .get('/', (req, res) => {
        db.Registrations
            .findAll({
                order: ['name']
            })
            .then((registrationRecords) => {
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 200,
                    success: true,
                    data: registrationRecords
                })
            })
            .catch((error) => {
                console.log(error.name)
                console.log(error.message)
                console.log(error.stack)
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 500,
                    success: false,
                    error: error
                })
            })
    })
    .get('/byCountryId', (req, res) => {
        let queryFilter = {
            where: { id: req.query.countryId },
            include: [{
                model: db.Registrations
            }],
            order: [
                [db.Registrations, 'name']
            ]
        }
        db.Countries
            .findAll(queryFilter)
            .then((regRecordsByCountry) => {
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 200,
                    success: true,
                    data: regRecordsByCountry
                })
            })
            .catch((error) => {
                console.log(error.name)
                console.log(error.message)
                console.log(error.stack)
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 500,
                    success: false,
                    error: error
                })
            })
    })
    .post('/',
        require('../middlewares/botPrevention'),
        (req, res) => {
            if (req.body.botPrevention !== '') {
                return routerResponse.json({
                    pendingResponse: res,
                    originalRequest: req,
                    statusCode: 404,
                    success: false
                })
            }
            db.Registrations
                .create({
                    company: req.body.company,
                    name: req.body.name,
                    email: req.body.email,
                    countryId: req.body.countryId,
                    comments: req.body.comments,
                    notified: false,
                    contacted: false
                })
                .then((newRegistrationRecord) => {
                    return routerResponse.json({
                        pendingResponse: res,
                        originalRequest: req,
                        statusCode: 200,
                        success: true,
                        data: newRegistrationRecord
                    })
                })
                .catch((error) => {
                    console.log(error.name)
                    console.log(error.message)
                    console.log(error.stack)
                    return routerResponse.json({
                        pendingResponse: res,
                        originalRequest: req,
                        statusCode: 500,
                        success: false,
                        error: error
                    })
                })
        })

module.exports = router
