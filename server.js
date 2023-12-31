import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv'

import usersRouter from "./api/routes/users.js"
import channelsRouter from "./api/routes/channels.js"
import messagesRouter from "./api/routes/messages.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

//CORS
app.use( cors() )

app.options('*', (req, res) => {
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.send();
});


app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})


const generateTimestamp = (req, res, next) => {
    req.timestamp = Date.now()
    next();
};

app.use(generateTimestamp);



app.get('/time', (req, res) => {
    console.log('Timestamp:', req.timestamp);
    res.send('Hello, world!'+ req.timestamp);
  });

app.use('/api/users', usersRouter)
app.use('/api/channels', channelsRouter)
app.use('/api/messages', messagesRouter )

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
})