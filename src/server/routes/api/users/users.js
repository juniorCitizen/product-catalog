import express from 'express'

import userRegistration from './userRegistration'

const router = express.Router()

router
    .route('/')
    .post(userRegistration)

module.exports = router
