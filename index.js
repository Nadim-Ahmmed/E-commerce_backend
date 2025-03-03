const express=require ("express")
const app=express();
require('dotenv').config();
const port=process.env.PORT;
const route=require('./Route');
const dbConnect = require("./config/db");

dbConnect()

app.use(express.json());
app.use(express.static("uploads"));
app.use(route);

app.listen(port,()=>{
    console.log(`server is running port number ${port}`)
})