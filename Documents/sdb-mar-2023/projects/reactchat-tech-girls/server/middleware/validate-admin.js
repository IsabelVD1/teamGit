const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const validateAdmin = async (req, res, next) =>{
    try {
        const token = req.headers.authorization;
        const decodedToken = await jwt.verify(token, process.env.JWT);
        const user = await User.findById(decodedToken.id);
        if(!user){
            throw Error("User Not Found");
    
        }else if(!user.isAdmin){
            throw Error("User is not an Admin");
        }

        req.user = user;
        return next();

    } catch (error) {
        res.json({message: error.message});
    }

}

module.exports = validateAdmin;