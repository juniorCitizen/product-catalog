import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const upload = multer({ dest: path.resolve('./dist/server/upload/') })

router
    .get('/', require('./read').products)
    .get('/categorized', require('./read').categorized)
    .get('/filtered', require('./read').filtered)
    .post('/',
        upload.fields([
            { name: 'primaryPhoto', maxCount: 1 },
            { name: 'secondaryPhotos', maxCount: 30 }
        ]),
        require('./insert'))
    .delete('/', require('./delete'))

module.exports = router
