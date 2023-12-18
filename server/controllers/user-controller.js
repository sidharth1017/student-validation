const User = require("../models/user-model");

class UserController {

    async getUser(req, res) {
        const { email } = req.body;

        try{
            const user = await User.findOne({email});
            if (user){
                console.log(user);
            }
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = new UserController();


