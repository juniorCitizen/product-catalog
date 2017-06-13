import dotenv from 'dotenv'

dotenv.config()

module.exports = (() => {
    return {
        SYS_REF: process.env.SYS_REF,
        NODE_ENV: process.env.NODE_ENV,
        HOST: process.env.NODE_ENV === 'production' ? process.env.PROD_HOST : process.env.DEV_HOST,
        PORT: process.env.PORT,
        PASS_PHRASE: process.env.PASS_PHRASE,
        VALIDATE: process.env.VALIDATE,
        TIMEZONE: process.env.TIMEZONE
    }
})()
