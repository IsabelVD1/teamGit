const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Message = require("../models/message.model");
const Room = require("../models/room.model");


// http://localhost:4000/message/create
router.post("/create", validateSession, async (req, res) => {
    try {
        const { when, user, room, body } = req.body

        const message = new Message({
            when: when,
            user: user,
            room: room,
            body: body,
            room_id: req.room_id,
        });

        const newMessage = await message.save();

        res.json({ message: "message was saved", message: newMessage });

    } catch (error) {
        res.json({ message: error.message });
    }
});

// http://localhost:4000/message/display-all/:room_name

router.get("/display-all/:room_name", validateSession, async (req, res) => {
    try {
        let messages = await Message.find({ room: req.params.room_name });

        res.json({ message: "Works from View all messages", message: messages });

    } catch (error) {
        res.json({ message: error.message });
    }
});

// http://localhost:4000/message/update/:id

router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const { when, user, room, body } = req.body;
        const filter = { _id: req.params.id, room_id: req.room_id };
        const messageToUpdate = {
            when: when,
            user: user,
            room: room,
            body: body,
        };

        const returnOptions = { new: true };

        const updateMessage = await Message.findOneAndUpdate(
            filter,
            messageToUpdate,
            returnOptions
        );
        if (!updateMessage) {
            throw new Error("Not authorized to update this message");
        }
        res.json({ message: "message was updated", message: updateMessage });
    } catch (error) {
        res.json({ message: error.message });

    }

});


// http://localhost:4000/message/delete/:id

router.delete("/delete/:id", validateSession, async (req, res) => {
    try {

        const id = req.params.id;
        if (
            !(await Message.find({ _id: req.params.id, room_id: req.room_id }))
        ) {
            throw Error("Not authorized to delete entry");
        }
        // console.log(id);
        const removedMessage = await Message.deleteOne({
            _id: id,
            room_id: req.room_id,
        });
        console.log(removedMessage);
        res.json({
            message:
                removedMessage.deletedCount > 0
                    ? "Deleted 1 document"
                    : "No documents were deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;