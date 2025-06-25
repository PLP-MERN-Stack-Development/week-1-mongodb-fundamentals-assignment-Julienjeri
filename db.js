const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Use lowercase "mongodb"
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  return client.db("plp_bookstore").collection("books");
}

module.exports = connectDB;
