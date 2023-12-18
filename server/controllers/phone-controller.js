const User = require("../models/user-model");
const otpService = require("../services/otp-service");

class PhoneController {
    async userNumber(req, res) {
        const { email, phone } = req.body;
        const otp = await otpService.generateOtp();

        try {
            const user = await User.findOne({email});
            if (user) {
                user.otp = otp;
                user.phone = phone;
                await user.save();

                await otpService.sendBySms(phone, otp);

                res.status(200).json({
                    message: "OTP sent to your phone number!"
                });
            } else {
                res.status(400).json({
                    message: "User not found!"
                });
            }

        }
        catch(err) {
            console.log(err);
            return res.status(500).json({message: "write error mesaage"}); 
        }
    }

    async validateNumber(req, res) {
        const { phone, otp } = req.body;
        
        try{
            const user = await User.findOne({phone});

            console.log(user)

            if (user && user.otp === otp){
                user.otp = '';
                user.credits += 100;

                await user.save();
                res.status(200).json({
                    message: "Phone verified, You got 100 credits to your account!!"
                });
            } else {
                res.status(400).json({
                    error: "Invalid OTP"
                });
            }
        } 
        catch(err) {
            console.log(err);
            return res.status(500).json({message: "write error mesaage"}); 
        }
    }
}


module.exports = new PhoneController();