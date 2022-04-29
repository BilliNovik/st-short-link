const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db')

const indexRoutes = require('./routes/index')
const linksRoutes = require('./routes/links')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'views')))

app.use(indexRoutes)
app.use('/links', linksRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is working on ${PORT} port`)
        })
    })
    .catch((e) => console.error(e))
