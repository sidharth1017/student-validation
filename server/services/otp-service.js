const crypto = require("crypto");
const nodemailer = require("nodemailer");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999).toString();
        return otp;
    }

    async sendByMail(email, otp) {
        try {
            let transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD, 
              },
            });
      
            const mailOptions = {
              from: process.env.EMAIL, 
              to: email,
              subject: 'Student Validation OTP',
              text: `Your OTP for student validation is: ${otp}`,
            };
      
            let info = await transporter.sendMail(mailOptions);
            return true; 
          } catch (error) {
            console.error("Error sending email: ", error);
            return false;
          } 
    }

    async sendBySms(phone, otp) {
      return await twilio.messages.create({
        to: phone,
        from: process.env.SMS_FROM_NUMBER,
        body: `Your OTP for student validation is: ${otp}`,
      });
    }
}

module.exports = new OtpService();