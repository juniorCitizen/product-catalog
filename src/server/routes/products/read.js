import db from '../../controllers/database'
import routerResponse from '../../controllers/routerResponse'

function filtered(req, res) {
    db.Products
        .findAll({
            where: {
                seriesId: req.query.seriesId,
                code: {
                    $like: `%${req.query.code}%`
                }
            }
        })
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
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                erro: error,
                message: 'failure while searching products table by seriesId and code'
            })
        })
}

function categorized(req, res) {
    let queryFilter = {
        include: [{
            model: db.Products,
            include: [
                { model: db.Descriptions },
                { model: db.Photos, attributes: { exclude: ['data'] } }
            ]
        }],
        order: [
            ['id'],
            [db.Products, 'code'],
            [db.Products, db.Photos, 'primary', 'DESC']
        ]
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
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 500,
                success: false,
                error: error,
                message: 'failure while querying for categorized product data'
            })
        })
}

function products(req, res) {
    let queryFilter = {
        include: [
            { model: db.Descriptions },
            { model: db.Photos, attributes: { exclude: ['data'] } }
        ],
        order: [
            ['code'],
            [db.Photos, 'primary', 'DESC']
        ]
    }
    return db.Products.findAll(queryFilter)
        .then((productRecords) => {
            return routerResponse.json({
                pendingResponse: res,
                originalRequest: req,
                statusCode: 200,
                success: true,
                data: productRecords
            })
        })
}

module.exports = {
    products: products,
    filtered: filtered,
    categorized: categorized
}
