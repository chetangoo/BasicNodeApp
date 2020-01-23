// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; 

const routes = require('./routes/api');
// const MONGODB_URI = 'mongodb+srv://chetan:1234@cluster0-ccymr.mongodb.net/test?retryWrites=true&w=majority'


// connecting to mongo heroku
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', function(){
    console.log('Mongoose is connected!!!!');
});

// // Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// setting up a custom variable
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);




app.listen(PORT, console.log(`Server is starting at ${PORT}`));