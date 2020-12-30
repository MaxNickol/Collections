const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/authRoutes');
const cors = require('cors');

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

//Common middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use('*', cors());
//Auth middlewares
app.use('/auth', authRouter);

const onListening = () => { 
    const address = server.address();

    const listener = `Listening on ${address.port}`;
    console.log(listener);
}


const serverStart = async () => {
    try{

        await mongoose.connect('mongodb+srv://izuki13:admin@cluster0.ff8no.mongodb.net/auth_roles?retryWrites=true&w=majority')
        server.on('listening', onListening);
        server.listen(port);


    }
    catch(e) {
        console.log(e)
    }
}

serverStart();