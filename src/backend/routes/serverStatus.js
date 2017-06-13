import express from 'express'

import eVars from '../config/environment'
import routerResponse from '../utilities/routerResponse'
import { serverStartTime } from '../server'

// middleware
import notImplemented from '../middlewares/preprocessing/notImplemented'

const router = express.Router()

router.route('/serverStatus')
    .get((request, response, next) => {
        return routerResponse.template({
            pendingResponse: response,
            statusCode: 200,
            reference: 'serverStatus',
            data: {
                title: eVars.SYS_REF,
                startTime: serverStartTime
            }
        })
    })
    .post(notImplemented)
    .put(notImplemented)
    .patch(notImplemented)
    .delete(notImplemented)

module.exports = router
