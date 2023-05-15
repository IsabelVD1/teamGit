
// // ? http://localhost:4000/user/update/:id

// router.patch("/update/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//         //const { firstName, lastName, email, password, isAdmin } = req.body; 
//         const filter = { _id: req.params.id };
//         const UserToUpdate = {
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password,
//             isAdmin: req.body.isAdmin,
//         };

//         const returnOptions = { new: true };

//         const user = await User.findOneAndUpdate(
//             filter,
//             UserToUpdate,
//             returnOptions
//         );
//         if (!user) {
//             throw new Error("Not Authorized to update");
//         }
//         res.json({ message: "User updated", user: UserToUpdate });



//     } catch (error) {
//         res.json({ message: error.message });
//     }
// });