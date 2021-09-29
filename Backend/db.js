const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Build the connection string
const dbURI = process.env.DB_URl || "mongodb://127.0.0.1:27017/booksDB";

// Create the database connection
mongoose
  .connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => {
    console.log(dbURI);
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ");
    throw err;
  });
