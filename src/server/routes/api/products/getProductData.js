import db from '../../../controllers/database'
import routerResponse from '../../../utilities/routerResponse'

function getProductData(req, res, next) {
    let queryFilter = {
        include: [{
            model: db.Products,
            include: [
                { model: db.Descriptions },
                { model: db.Photos, attributes: { exclude: ['photoData'] } }
            ]
        }]
    }
    return db.Series.findAll(queryFilter)
        .then((productRecords) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: productRecords
            })
        })
        .catch((error) => {
            console.log(error)
            // return error object to the frontend
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'product series data query failure'
            })
        })
}

module.exports = getProductData
