import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'
// import alertRegistration from './alertRegistration'
// import sendThankYou from './sendThankYou'

function userRegistration(req, res, next) {
    if (req.body.botPrevention !== null) {
        return routerResponse.json({
            pendingResponse: res,
            originalRequest: req,
            statusCode: 404,
            success: false
        })
    }
    // let emailMessages = [
    //     sendThankYou(req.body.name, req.body.email, req.body.comments),
    //     alertRegistration(req.body.company, req.body.name, req.body.email, req.body.country, req.body.comments)
    // ]
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
            // console.log(newRegistrationRecord.dataValues)
            // res.newRegistrationRecord = newRegistrationRecord.dataValues
            // return Promise.all(emailMessages)
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: newRegistrationRecord
            })
        })
        // .then((emailResponse) => {
        //     console.log(emailResponse)
        //     return routerResponse.json({
        //         pendingResponse: res,
        //         originalRequest: req,
        //         statusCode: 200,
        //         success: true,
        //         data: res.newRegistrationRecord
        //     })
        // })
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
