//Express
const express = require('express');
const app = express();
const server = require('http').Server(app);

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const io = require('socket.io')(server);
const config = require('./config/database');

const port = process.env.PORT || 8080; 

//Socket.io Connection
io.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('disconnect', () => {
    console.log('a user has disconnected');
  })
})

//Database Connection
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database Error: ' + err);
});

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Socket io middleware
app.use(function(req,res,next){
  req.io = io;
  next();
});

//Routes
const polls = require('./routes/polls');
app.use('/polls', polls);

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello?');
})

server.listen(port, () => {
  console.log('Server started on port ' + port);
})