import express from 'express'

import db from '../controllers/database'

const router = express.Router()

router
    .route('./series')
    .get((req, res, next) => {
        db.Series
            .findAll()
            .then(() => {})
            .catch((error) => {})
    })
