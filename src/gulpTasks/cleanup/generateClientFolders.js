import fs from 'fs-extra'
import Promise from 'bluebird'

module.exports = (gulp, plugins) => {
    return (done) => {
        fs.pathExists('./dist')
            .then((exist) => {
                if (exist) {
                    return fs.remove('./dist')
                } else {
                    return Promise.resolve()
                }
            })
            .then(() => {
                return Promise
                    .all([
                        fs.ensureDir('./dist/server/client/assets'),
                        fs.ensureDir('./dist/server/client/lib'),
                        fs.ensureDir('./dist/server/client/style')
                    ])
                    .then(() => {
                        return done()
                    })
            })
            .catch((error) => {
                return done(error)
            })
    }
}
