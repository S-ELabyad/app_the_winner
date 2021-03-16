const express = require ('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
// librari hia li katkhalik tkhdem bi api dialk waset projet 
const axios = require('axios');

require('./models/dbConfig');

//add category
const AddCategory = require('./controllers/CategoryController');
//add sport
const questionRoutes = require('./controllers/questionController');
//add music
const reh = require ('./controllers/questionController2');

const formadd = require('./controllers/formadd');

const formQuestion = require('./controllers/formQuestion');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { static } = require('express');


mongoose.set('useFindAndModify' , false);
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.static('public'));

app.use('/Category' , questionRoutes); 

app.use('/AddCategory' , AddCategory); 
// 
app.use('/Category2' , reh);

app.use('/formadd', formadd);

app.use('/Question', formQuestion);



// create a request handler to handle the user login request

const users = [
    {
        username: 'saloua',
        password: 'password123admin',
        role: 'admin'

    }, {
        username: 'anna',
        password: 'password123member',
        role: 'user'
    }
];

//secret token 

const accessTokenSecret = 'youraccesstokensecret';

app.post('/login', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});

///

const books = [
    {
        "author": "Chinua Achebe",
        "country": "Nigeria",
        "language": "English",
        "pages": 209,
        "title": "Things Fall Apart",
        "year": 1958
    },
    {
        "author": "Hans Christian Andersen",
        "country": "Denmark",
        "language": "Danish",
        "pages": 784,
        "title": "Fairy tales",
        "year": 1836
    },
];

app.get('/books', (req, res) => {
    res.json(books);
});

// we can authenticate using the authentication service and then authorize the users in the book service

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/books', authenticateJWT, (req, res) => {
    res.json(books);
});

// admin can add a new book
app.post('/books', authenticateJWT, (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.send('  No login you are not Admin  ');
    }

    const book = req.body;
    books.push(book);

    res.send(book);
});

// //port
app.listen(4000 , () => console.log('Server is starting :4000'));

