require('dotenv').config();
const nodemailer = require('nodemailer');

const email = process.env.MAIL_USER
const pass = process.env.MAIL_PASS
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});
module.exports = (mailOptions) =>{
   transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log('error sending mail: ',error);
            return false;
        }
        return true;
   }) 
}