const express = require('express');

const bank = require('./routes/bank.route');

const app = express();

const PORT = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', checkBalance);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
