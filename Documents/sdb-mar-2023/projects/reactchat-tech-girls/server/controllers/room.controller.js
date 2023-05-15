const router = require("express").Router();
const Room = require("../models/room.model");
const validateSession = require("../middleware/validate-session");


// ? http://localhost:4000/room/create

router.post("/create", validateSession, async (req, res) => {
    try {
        const { name, description } = req.body;
        const room = new Room({
            name: name,
            description: description,
            addedUsers: req.user._id,
        });

        const newRoom = await room.save();
        res.json({ room: newRoom, message: "new room created" });

    } catch (error) {
        res.json({ message: error.message });

    }
});

// ? http://localhost:4000/room/view-all

router.get("/view-all", validateSession, async (req, res) => {
    try {
        let rooms = await Room.find().populate(
            "addedUsers",
            "firstName lastName"
        );
        res.json({ message: "Works from View all rooms", room: rooms });

    } catch (error) {
        res.json({ message: error.message });
    }
});


// ? http://localhost:4000/room/delete/:id

router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        const id = req.params.id;
        const roomRecord = await Room.findById({
            _id: req.params.id,
            addedUsers: req.user._id,
        });

        if (!roomRecord) {
            throw new Error("Not authorized to delete this room");
        }

        const deletedRoom = await Room.deleteOne({
            _id: id,
            addedUsers: req.user._id,
        });
        res.json({
            message:
                deletedRoom.deletedCount
                    ? "Room was deleted"
                    : "Room was not deleted",
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// ? http://localhost:4000/room/update/:id

router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        const { name, description } = req.body;

        const filter = { _id: req.params.id, addedUsers: req.user._id };
        const roomToUpdate = {
            name: name,
            description: description
        };

        const returnOptions = { new: true };

        const room = await Room.findOneAndUpdate(
            filter,
            roomToUpdate,
            returnOptions
        );

        if (!room) {
            throw new Error("Not authorized to update this room");
        }
        res.json({ room: room, message: "Room was updated" });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// ? http://localhost:4000/room/:id
router.get("/:id", async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        res.json({ message: "Works for get by room", room: room });
    } catch (error) {
        res.json({ message: error.message });
    }
});



module.exports = router;