const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ssp:capstone@badbankcapstone.ljebaet.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  /*/async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!"); 
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  //run().catch(console.dir);/*/

  async function test() {
    try {
      await client.connect();
      const db = client.db("myproject");
      const collection = db.collection("customers");
  
      const name = 'user' + Math.floor(Math.random()*10000);
      const email = name + '@mit.edu';
      const doc = { name, email };
      
      await collection.insertOne(doc);
      console.log('document inserted');
  
      const customers = await collection.find().toArray();
      console.log(customers);
    } catch (err) {
      console.error(err);
    } finally {
      await client.close();
    }
  }
  
  test();
/*/
  client.connect(function(err, client) {
    console.log('Connected!');
    
    const dbName = 'myproject';
    const db = client.db(dbName);

    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';
    
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err,result) {
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

        client.close();
        });
        
});
/*/
