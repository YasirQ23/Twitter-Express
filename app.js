const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const { authenticate } = require('./src/middleware/auth')
const path = require('path')
const cookieParser = require('cookie-parser')
const { userData } = require('./src/middleware/userData')

dotenv.config()

const app = express()

app.use(userData)

connectDB()

app.use(cookieParser())
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, '/src/templates/views'));

app.use(authenticate)

require("./src/routes")(app)

app.listen(process.env.PORT, () => {
    console.log(`Server now running on PORT ${process.env.PORT}`)
});


// has to be an ojbect that your passing into one fo your render templates    

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/profile', (req, res, next) => {
    res.render('profile');
});

app.get('/user', (req, res, next) => {
    res.render('user');
});

