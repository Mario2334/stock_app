var express = require('express');
var router = express.Router();
// var client = require("../app")
/* GET home page. */

router.get('/',async function(req, res, next) {
  const database =db_client.db("stock");
  const collection = database.collection("dow_jones");
  let list_data = await collection.find({}).toArray()
  res.render('index',{data:list_data});
});

module.exports = router;

