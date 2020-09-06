const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/router')

const PORT = process.env.PORT || 3333;
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})
