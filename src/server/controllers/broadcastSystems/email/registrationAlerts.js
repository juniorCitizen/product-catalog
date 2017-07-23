import emailTransporter from '../../../config/email'
import eVars from '../../../config/environment'

function registrationAlerts(record) {
    let emailOptions = {
        from: `"${eVars.ADMIN}" <${eVars.ADMIN_EMAIL}>`,
        to: [
            'david.tsai@gentry-way.com.tw',
            'david.tsai.gentry@gmail.com'
        ],
        subject: '客戶網頁註冊通知',
        html: `
            網站於 ${Date()} 接收到以下客戶註冊資訊:<br>
            <br>
            記錄ID: ${record.id}<br>
            公司名稱: ${record.company}<br>
            姓名: ${record.name}<br>
            電子郵件: ${record.email}<br>
            國家: ${record.country}<br>
            其他資訊: <br>
            <p style="white-space:pre-wrap;">${record.comments}</p>
            <br>
            請回應客戶聯繫並確認需求，謝謝<br>
            <br>
            <br>
            <div style="font-size:60%;">EMAIL CONFIDENTIALITY NOTICE: This email transmission and any attachments contained within may contain information that is confidential or otherwise exempt from disclosure under applicable law and is intended solely for the use of the individual(s) to whom it was intended to be addressed. If you have received this email by mistake, or you are not the intended recipient, any disclosure, dissemination, distribution, copying or other use or retention of this communication or its substance is prohibited. If you have received this communication in error, please immediately report to the author via email that you received this message by mistake and also permanently destroy printed copies and delete the original and all copies of this email and any attachments from your computer.</div>`
    }
    return emailTransporter.sendMail(emailOptions)
}

module.exports = registrationAlerts
