const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/router')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/liferay-cypress', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 3333;
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})
