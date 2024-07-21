const connectDb = require("./config/dbConnect")
const Product = require("./models/productModel");
const jsonData = require("./product.json");

// Function to insert data into MongoDB
const insertDataIntoMongoDB = async () => {
  try {
    // await connectDb();
    await Product.deleteMany()
    await Product.insertMany(jsonData);
    console.log("Data inserted successfully:");
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
  }
};
module.exports = insertDataIntoMongoDB; 
