const express = require("express");
const fs = require('fs');
const app = express();
const createError = require('http-errors');
app.use(express.json());
var port = 8000;

var routePath = require('./routes/studentroute');


app.use("/", routePath);



app.all("*", (req, res, next) => {
    const err = new Error(`Requested URL ${req.path} not found`)
    err.statusCode = 404;
    next(err)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        message: err.message,

    })
})

app.listen(port, (err) => {
    if (err) {
        console.log({ message: err });
    }
    console.log("Server Is run Sucessfully, port: ", port);
})