const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const path = require('path');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')

dotenv.config()

const app = express()

connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});

app.set('view engine', 'ejs');


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
