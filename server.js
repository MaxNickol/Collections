const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/authRoutes');
const apiRouter = require('./Routes/apiRoutes');

// Modules for auth and registration from social networks
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {secret} = require('./config/config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');



//Common config of the server
const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 5000;

//Common middlewares
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use('*', cors());


app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser(secret));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.config')(passport);

//Auth middlewares
app.use('/auth', authRouter);
app.use('/api', apiRouter);



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