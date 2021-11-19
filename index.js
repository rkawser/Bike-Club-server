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
       const database = client.db('bicycle_project');
       const bicycleConnection = database.collection('bicycle');
       const userConnection = database.collection('userOrders');
       const reviewConnection = database.collection('userReview');


       app.delete('/userOrders/:email/:id',async(req,res)=>{
           const email = req.params.email;
           const id = req.params.id;
           console.log(email,id);
           const qeury ={_id:ObjectId(id),userEmail:email}
           const result = await userConnection.deleteOne(qeury)
           res.json(result)
       });


       //post user review
       app.post('/userReview',async(req,res)=>{
        const data = req.body;
        const result = await reviewConnection.insertOne(data);
        res.json(result)
       })
       
       //post user orders
       app.post('/bicycle',async(req,res)=>{
        const data = req.body;
        const result = await bicycleConnection.insertOne(data);
        res.json(result)
       })


       //post user orders
       app.post('/userOrders',async(req,res)=>{
        const data = req.body;
        const result = await userConnection.insertOne(data);
        res.json(result)
       })

        //api load review
        app.get('/userReview',async(req,res)=>{
            const cursor = reviewConnection.find({})
            const result = await cursor.toArray();
            res.send(result)
           })

       
       //api load
       app.get('/bicycle',async(req,res)=>{
        const cursor = bicycleConnection.find({}).limit(6)
        const result = await cursor.toArray();
        res.send(result)
       })

       //api load explore
       app.get('/bicycles',async(req,res)=>{
        const cursor = bicycleConnection.find({})
        const result = await cursor.toArray();
        res.send(result)
       })

       //load single service
       app.get('/bicycle/:id',async(req,res)=>{
           const id = req.params.id;
           const qeury = {_id:ObjectId(id)};
           const result = await bicycleConnection.findOne(qeury);
           res.json(result);
       })


       //api load
       app.get('/userOrders',async(req,res)=>{             
        const cursor = userConnection.find({})
        const result = await cursor.toArray();
        res.send(result)
      })

      app.get('/userOrders/:email',async(req,res)=>{
          const email= req.params.email;
           const  qeury ={userEmail: email}         
        const cursor = userConnection.find(qeury)
        const result = await cursor.toArray();
        res.send(result)
      })

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
