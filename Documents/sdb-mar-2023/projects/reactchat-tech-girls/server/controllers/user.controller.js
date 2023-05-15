const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

// ? http://localhost:4000/user/create

router.post("/create", async (req, res) => {
    try {

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            isAdmin: req.body.isAdmin,
        });

        // Save the data to the DB
        const newUser = await user.save();

        let token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: 60 * 60 * 48 });
        res.json({
            user: newUser,
            message: "new user created",
            token: token
        });

    } catch (error) {
        res.json({ message: error.message });

    }
});

// ? http://localhost:4000/user/login

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            let token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: 60 * 60 * 48 });
            res.json({
                message: passwordMatch
                    ? "password matched"
                    : "password did not match",
                token: passwordMatch ? token : "invalid token",
            });
        } else {
            res.json({ message: "User does not exits" });
        }

    } catch (error) {
        res.json({ message: error.message });
    }
});

/*
// ? http://localhost:4000/user/update/:id

router.patch("/update/:id", validateSession, async (req, res) => {
    const id = req.params.id;
    try {
        //const { firstName, lastName, email, password, isAdmin } = req.body; 
        const filter = { _id: req.params.id };
        const UserToUpdate = { 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password,
            isAdmin: req.body.isAdmin, 
        };

        const returnOptions = { new: true };

        const user = await User.findOneAndUpdate(
            filter,
            UserToUpdate,
            returnOptions
        );
           if(!user){
               throw new Error("Not Authorized to update");
           }
           res.json ({ message: "User updated", user: UserToUpdate });

        
        
    } catch (error) {
        res.json({ message: error.message });
    }
});*/


// ? http://localhost:4000/user/delete/:id

router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;
        const userFound = await User.findById({ _id: req.params.id });
        if (!userFound) {
            throw new Error("Not Authorized to deleted");
        }
        //    req.user.id = "aaabbb"
        //    http://localhost:4000/user/delete/bbaa

        //    aaabbb === bbaa

        console.log(req.user._id)
        console.log(userFound._id)
        const isValidUser = req.user._id.equals(userFound._id)

        console.log(isValidUser)
        if (!isValidUser) {
            throw new Error("The id you are trying to delete does not match the id from the token. User not authorized to delete");
        }


        const deletedUser = await User.deleteOne({
            _id: req.params.id,
        });
        res.json({
            deletedUser: deletedUser,
            message:
                deletedUser.deletedCount === 1
                    ? "User deleted"
                    : "User not deleted",
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});



module.exports = router;