import express from 'express'

// import db from '../../controllers/database'
import routerResponse from '../../utilities/routerResponse'

const router = express.Router()

router
    .route('/')
    .post(userRegistration)

module.exports = router

function userRegistration(req, res, next) {
    if (req.body.botPrevention !== null) {
        return routerResponse.json({
            pendingResponse: res,
            originalRequest: req,
            statusCode: 404,
            success: false
        })
    }
    return routerResponse.json({
        pendingResponse: res,
        originalRequest: req,
        statusCode: 200,
        success: true,
        data: {
            company: req.body.company,
            name: req.body.name,
            email: req.body.email,
            country: req.body.country,
            comments: req.body.comments
        }
    })
}
