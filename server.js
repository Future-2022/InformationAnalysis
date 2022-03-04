const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');


var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Init Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Define Routes
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

http.listen(5000, function(){
  console.log('listening on *:5000');
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
