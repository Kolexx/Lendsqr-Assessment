const router = require('express').Router();
const {
  createNewAccount,
  withDraw,
  deposit,
  transfer,
  balance,
} = require('../middleware/bank');

router.get('/balance/:acid', (req, res) => {
  console.log(req.params);
  const acid = req.params.acid;
  balance(acid, (bal) => {
    res.status(200).json({ bal });
  });
});

router.put('/deposit', (req, res) => {
  deposit(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

router.put('/withdraw', (req, res) => {
  withDraw(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

router.put('/transfer', (req, res) => {
  transfer(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

router.post('/createAccount', (req, res) => {
  createNewAccount(req.body, () => {
    res.json({ sts: 'Succesful', msg });
  });
});
module.exports = router;
