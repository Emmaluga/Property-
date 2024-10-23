const nodeMailer = require('nodemailer')

const sendMailFunc = async (options)=> {

    const transporter = nodeMailer.createTransport({

        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.USER_EMAIL,
          password: process.env.USER_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.Email_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    }

transporter.sendMail(mailOptions, (err, msg)=> {

    if(err){
   console.log(err)
    }
    if(msg){
   console.log('cant read message')
    }
    
})

}

module.exports = { sendMailFunc }