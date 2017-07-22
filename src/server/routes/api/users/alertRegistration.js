import Promise from 'bluebird'

import emailTransporter from '../../../config/email'
import eVars from '../../../config/environment'

function alertRegistration(company, name, email, country, comments) {
    let regTime = new Date()
    let emailOptions = {
        from: `"${eVars.ADMIN}" <${eVars.ADMIN_EMAIL}>`,
        to: [
            'david.tsai@gentry-way.com.tw',
            'david.tsai.gentry@gmail.com'
        ],
        subject: '仲群維官方網站客戶註冊通知',
        html: `
            網站於 ${regTime.getFullYear()}-${regTime.getMonth() + 1}-${regTime.getDate()} ${regTime.getHours()}:${regTime.getMinutes()} 接收到以下客戶註冊資訊:<br>
            <br>
            公司名稱: ${company}<br>
            姓名: ${name}<br>
            電子郵件: ${email}<br>
            國家: ${country}<br>
            其他資訊: <br>
            <p style="white-space:pre-wrap;">${comments}</p>
            <br>
            請盡快與客戶聯繫確認需求，謝謝<br>
            `
    }
    return new Promise((resolve, reject) => {
        emailTransporter.sendMail(emailOptions, (mailError, mailResponse) => {
            if (mailError) {
                return reject(mailError)
            } else {
                return resolve(mailResponse.accepted)
            }
        })
    })
}

module.exports = alertRegistration
