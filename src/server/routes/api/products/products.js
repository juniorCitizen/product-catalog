import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const upload = multer({ dest: path.resolve('./dist/server/upload/') })

router
    .get('/', require('./getProductData'))
    .get('/productCodes', require('./getProductCodes'))
    .post('/',
        upload.fields([
            { name: 'primaryPhoto', maxCount: 1 },
            { name: 'secondaryPhotos', maxCount: 30 }
        ]),
        require('./insertProductRecord'))
    .delete('/', require('./deleteProductRecord'))

module.exports = router
