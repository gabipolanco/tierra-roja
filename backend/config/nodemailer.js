const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.HOTMAIL_USER,
        pass: process.env.HOTMAIL_PASS
    }
})
exports.emailConfirmacion = (email, hashId) => {
    return transporter.sendMail({
        from: 'chapatidelta@hotmail.com',
        to: email,
        subject: 'Confirma tu casilla de correo',
        html: `
        
        `
    })
}