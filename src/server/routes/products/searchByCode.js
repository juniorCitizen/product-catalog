import db from '../../controllers/database'
import routerResponse from '../../controllers/routerResponse'

module.exports = (req, res) => {
    db.Products
        .findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            },
            where: {
                seriesId: req.query.seriesId,
                code: {
                    $like: `%${req.query.code}%`
                }
            },
            include: [{
                model: db.Descriptions,
                attributes: {
                    exclude: [
                        'createdAt',
                        'updatedAt',
                        'deletedAt'
                    ]
                }
            }, {
                model: db.Photos,
                attributes: {
                    exclude: [
                        'data',
                        'createdAt',
                        'updatedAt',
                        'deletedAt'
                    ]
                }
            }],
            order: [db.Photos, 'primary', 'DESC']
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
