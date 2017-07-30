import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

function userRegistration(req, res, next) {
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
            country: req.body.country,
            comments: req.body.comments,
            noticeIssued: false,
            thankYouSent: false
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
            console.log(error)
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error
            })
        })
}

module.exports = userRegistration
