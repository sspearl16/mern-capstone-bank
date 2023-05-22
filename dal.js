require('dotenv').config();

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

  const db = client.db("BadBank");
  const collection = db.collection("customers");


//create user
async function create(name, email, password ) {
    try{
        await client.connect();
        const doc = {name, email, password, balance:0};
        await collection.insertOne(doc);
        console.log('document inserted');
        return doc;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

//find via email
async function find(email) {
    try {
        await client.connect();
        const docs = await collection.find({email:email}).toArray();
        return docs;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

//login
async function login(email, password){
    try {
        await client.connect();
        const user = await collection.findOne({email, password});
        return { id: user._id, ...user };
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

async function deposit(user, amount){
    const newBalance = user.balance + Number(amount);
    console.log('newBalance: '+ newBalance);
    try {
        await client.connect();
        const result = await collection.updateOne(
            { email: user.email },
            { $set: { balance : newBalance }}
        );
        console.log(result.modifiedCount + " document updated");
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

async function withdraw(user, amount) {
    const newTotal = user.balance - Number(amount);
    console.log('newTotal:' + newTotal);
    try{
        await client.connect();
        const result = await collection.updateOne(
                {email: user.email},
                {$set: {balance: newTotal}},
            );
            return result;
        } catch(err) {
            console.error(err);
        } finally {
            await client.close();
        }
};


async function update(email,amount) {
    try {
        await client.connect();
        const customers = await collection.findOneAndUpdate(
            {email:email},
            { $inc: {balance: amount}},
            {returnOriginal: false},
        );
        return customers.value;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};

async function findOne(email){
    try {
        await client.connect();
        const customers = await collection
                            .findOne({email});
        return customers;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

async function all(){
    try {
        await client.connect();
        const customers = await collection
                            .find({})
                            .toArray();
        return customers;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = {create, findOne, find, deposit, withdraw, login, update, all};