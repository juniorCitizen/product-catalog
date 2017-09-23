import open from 'open'

require('dotenv').config()

module.exports = (gulp, plugins) => {
    return (done) => {
        setTimeout(() => {
            open(`${process.env.REMOTE_DEV_HOST}/${process.env.SYS_REF}`)
            return done()
        }, process.env.RESET_DB === 'true' ? 60000 : 10000)
    }
}
