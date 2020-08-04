const socket= require("socket.io")
var express = require('express');
var router = express.Router();
var client = require("../app")
const io = socket({ forceNew: true ,reconnectionDelay:10000 , reconnectionAttempts: 1});
let ObjectID = require('mongodb').ObjectID

const activeUsers = new Set();

io.on("connection", function (socket) {
    console.log("Made socket connection");
    socket.on("add user",function (data) {
        console.log("Added File")
        activeUsers.add(data)
        console.log(activeUsers)
    })
});


router.get('/update_val',async function(req, res, next) {
    const database =db_client.db("stock");
    const collection = database.collection("dow_jones");
    let id = req.query.id
    let newObj = new ObjectID(id);
    let row = await collection.findOne({_id:newObj})
    console.log(id)
    res.send(id)
    io.emit("fresh data",row)
})

module.exports = {
    "io":io,
    "router":router
}

