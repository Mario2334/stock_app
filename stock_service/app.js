require('dotenv').config()
const { MongoClient } = require("mongodb");
let axios = require("axios");

function getRandomArbitrary(min, max) {
    let random = Math.random() * (max - min) + min
    return random.toFixed(2);
}

function get_update_query(row){
    let curr_price = row.Price
    let min = curr_price-4
    let max = curr_price+4
    let changedValue = getRandomArbitrary(min,max)
    console.log(changedValue);
    let new_vol_price = changedValue * row.Volume
    console.log(row)
    // Calculate ytd percent change based on new value
    let ytd = parseFloat(row["YTD Change"].trim("%"))
    let soy_price = (100*curr_price)/(100-ytd)
    let new_ytd = (soy_price-changedValue)*100/soy_price

    // Update Query
    let update_query = {
        Price:changedValue,
        "Volume * Price": new_vol_price.toFixed(2),
        "YTD Change":new_ytd.toFixed(2)+"%"
    }
    return update_query
}

async function service() {
    let db_client = MongoClient(process.env.MONGO_URL,{ useUnifiedTopology: true })
    await db_client.connect();
    let collection = db_client.db("stock").collection("dow_jones");
    let row = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

    //Get Calculate Random Price
    row=row[0]
    let update_query = get_update_query(row)
    const update_row =await collection.updateOne({_id:row._id} ,{$set:update_query} )
    if(update_row.result.nModified>0){
        let resp = await axios.get(process.env.API_URL+`/update_val?id=${row["_id"]}`)
    }
    db_client.close()
}

const interval = setInterval(function () {
 service().then(()=>null)
},5000)
