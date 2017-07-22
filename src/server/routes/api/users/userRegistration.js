// import db from '../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'
import alertRegistration from './alertRegistration'
import sendThankYou from './sendThankYou'

function userRegistration(req, res, next) {
    if (req.body.botPrevention !== null) {
        return routerResponse.json({
            pendingResponse: res,
            originalRequest: req,
            statusCode: 404,
            success: false
        })
    }
    let emailMessages = [
        sendThankYou(req.body.name, req.body.email, req.body.comments),
        alertRegistration(req.body.company, req.body.name, req.body.email, req.body.country, req.body.comments)
    ]
    Promise.all(emailMessages)
        .then((response) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true
            })
        })
        .catch((error) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false
            })
        })
}

module.exports = userRegistration
