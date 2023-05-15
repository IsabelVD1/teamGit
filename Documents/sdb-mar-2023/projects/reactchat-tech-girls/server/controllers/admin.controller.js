const router = require("express").Router();
const validateAdmin = require("../middleware/validate-admin");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 


// ? http://localhost:4000/user/update/:id

router.patch("/update/:id", validateAdmin, async (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const filter = { _id: id };
    const userToUpdate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        isAdmin: isAdmin,
    };
    const returnOptions = { new: true };

    try {
        const updatedUser = await User.findOneAndUpdate(
            filter,
            userToUpdate,
            returnOptions
        );
        res.json({ message: "User was updated", user: updatedUser });
    }
    catch (error) {
        res.json({ message: error.message });
    }

});

module.exports = router;