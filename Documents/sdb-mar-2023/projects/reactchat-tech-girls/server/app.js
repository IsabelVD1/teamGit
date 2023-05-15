require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controllers/user.controller");
const roomController = require("./controllers/room.controller");
const messageController = require("./controllers/message.controller");

const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

db.once("open", () => console.log("connected to the DB"));

app.use(cors());
app.use(express.json());

app.use("/user", userController);
app.use("/room", roomController);
app.use("/message", messageController);


app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});



