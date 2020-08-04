const { MongoClient } = require("mongodb");

let db_client = MongoClient(process.env.MONGO_URL,{ useUnifiedTopology: true })
global.db_client = db_client;
