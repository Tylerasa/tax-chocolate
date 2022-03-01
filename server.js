const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});



app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})
