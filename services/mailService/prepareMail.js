const sendMail = require('./sendMail');

module.exports = (to, subject, html) => {
    return {
        to,
        subject,
        html
    }
}