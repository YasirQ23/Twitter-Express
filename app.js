const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(`Request received at: ${Date()}`);
    next();
});

// has to be an ojbect that your passing into one fo your render templates    

app.get('/home', (req, res, next) => {
    res.render('pages/index');
});

app.get('/', (req, res, next) => {
    res.render('pages/login');
});

app.get('/register', (req, res, next) => {
    res.render('pages/register');
});

app.get('/profile', (req, res, next) => {
    res.render('pages/profile');
});

app.get('/user', (req, res, next) => {
    res.render('pages/user');
});

app.use(express.static(path.join(__dirname, 'public')));
