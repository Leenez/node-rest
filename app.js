const express = require('express')
const customerRouter = require('./routes/customer')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/customers', customerRouter)
app.listen(9000, () => console.log('server started'))