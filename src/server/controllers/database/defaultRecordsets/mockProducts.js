module.exports = (() => {
    let products = []
    for (let seriesId = 0; seriesId < 10; seriesId++) {
        let productCount = Math.floor(Math.random() * 20) + 1
        for (let counter = 1; counter <= productCount; counter++) {
            products.push({
                seriesId: seriesId,
                code: 'GT-' + ('0000' + Math.floor(Math.random() * 9999) + 1).slice(-4),
                name: require('random-sentence')({
                    min: 3,
                    max: 5
                }),
                type: seriesId !== 9 ? 'product' : 'accessory'
            })
        }
    }
    return products
})()
