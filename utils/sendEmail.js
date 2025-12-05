const nodemail=require('nodemailer');
const { email, password } = require('../config/Connection');

const sendEmail=async (emailTo,subject,code,content)=>{
    const transporter=nodemail.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:email,
            pass:password
        }
    });

    const message={
        to:emailTo,
        subject:subject,
        html:`
        <div>
            <h3>Verification Code</h3>
            <h4>${content}</h4>
            <p><strong>Code: </strong>${code}</p>
        </div>
        `
    };

    transporter.sendMail(message,(err)=>{
        console.log(err.message);
    });
}


module.exports=sendEmail;






// myaccount.google.com/apppasswords