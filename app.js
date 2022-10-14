const express = require('express');
const bodyParser = require('body-parser');
const bank = require('./routes/bank.route');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 4001;

app.use('/bank', bank);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
