const express = require('express');
const mongoose = require('mongoose');
const app = express();

const users = require('./controllers/api/user')
const profile = require('./controllers/api/profile')
const posts = require('./controllers/api/post')

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => { 
    console.log('MongoDB Connected')
})
.catch(error => {
    console.log(error)
})

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/post', posts)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})