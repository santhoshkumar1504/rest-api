
const port=process.env.PORT;
const mongodb_url=process.env.URL;
const jwtSecret=process.env.JWT_SECRET;
const email=process.env.SEND_EMAIL;
const password=process.env.EMAIL_PASS;

module.exports={port,mongodb_url,jwtSecret,email,password};