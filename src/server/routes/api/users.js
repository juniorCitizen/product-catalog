import express from 'express'

// import db from '../../controllers/database'
import eVars from '../../config/environment'
import emailTransporter from '../../config/email'
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
    let emailOptions = {
        from: `"${eVars.ADMIN}" <${eVars.ADMIN_EMAIL}>`,
        to: req.body.email,
        subject: 'test email sending and receiving',
        html: `
            company: ${req.body.company},
            name: ${req.body.name},
            email: ${req.body.email},
            country: ${req.body.country},
            comments: ${req.body.comments}`
    }
    emailTransporter.sendMail(emailOptions, (mailError, mailResponse) => {
        if (mailError) {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                message: 'email sending error',
                error: mailError
            })
        } else {
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
                    comments: req.body.comments,
                    emailResponse: mailResponse.accepted
                }
            })
        }
    })
}
