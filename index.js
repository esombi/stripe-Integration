const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


//import route
const payment = require('./route/payment');

//router middleware
app.use("/api/v1", payment);



app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port: ${process.env.PORT}`);
});