import path from 'path'

import routerResponse from '../../controllers/routerResponse'

module.exports = (req, res) => {
    return routerResponse.image({
        pendingResponse: res,
        statusCode: 200,
        mimeType: 'image/svg+xml',
        imagePath: path.resolve(`./dist/server/client/assets/${req.query.country}.svg`)
    })
}
