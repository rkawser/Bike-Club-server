const express= require('express');
const { MongoClient } = require('mongodb');
const app =express();
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middlewire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hahmn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
       
    }
  
    finally{
        // await client.close();
    }

}


run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send('hello form bicycle website')
});

app.listen(port,(req,res)=>{
    console.log('bicycle server is running',port);
});
