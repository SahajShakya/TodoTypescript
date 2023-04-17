import mongoose from 'mongoose';
import "dotenv/config";

import env from '../util/validateEnv';
import app from '../app';

const port = env.PORT;


mongoose.connect(env.MONGO_DB_STRING)
    .then(() => {
        console.log("Mongose connected");
        app.listen(port, ()=> {
            console.log("Server running at "+ port);
        })
    })
    .catch(console.error)

