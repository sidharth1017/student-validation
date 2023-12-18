const User = require("../models/user-model");
const otpService = require("../services/otp-service");

class EmailController {
    async signup(req, res) {
        const { name, email, password } = req.body;

        const otp = await otpService.generateOtp();

        try {
            const newUser = new User({name, email, otp, password});
            await newUser.save();
            await otpService.sendByMail(email, otp);

            return res.status(200).json({
                email,
                message: "Please verify your account!"
            })
        }
        catch(err) {
            console.log(err);
            return res.status(500).json({message: "write error mesaage"}); 
        }
    }

    async validateEmail(req, res) {
        const { email, otp } = req.body;
        
        try{
            const user = await User.findOne({email});

            if (user && user.otp === otp){
                user.otp = '';
                user.credits += 100;

                await user.save();
                res.status(200).json({
                    message: "Email verified, You got 100 credits to your account!!"
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

module.exports = new EmailController();