const express = require('express');
const config = require('./config/config')
const leadsFinder = require('./routes/leads')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();


const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/v1/', leadsFinder)
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT} in ${process.env.NODE_ENV} mode`);
});
