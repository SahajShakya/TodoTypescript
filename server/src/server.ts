import express from 'express';
const app = express();
import mongoose from 'mongoose';
import "dotenv/config";
const port = 5000;

import env from '../util/validateEnv';

app.get("/", (req,res) => {
    res.send("Hello world");
})

mongoose.connect(env.MONGO_DB_STRING)
    .then(() => {
        console.log("Mongose connected");
        app.listen(port, ()=> {
            console.log("Server running at "+ port);
        })
    })
    .catch(console.error)

