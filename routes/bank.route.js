const router = require('express').Router();
const service = require('../controller/bank');

router.post('/createAccount', (req, res) => {
  service.createNewAccount(req.body, (msg) => {
    res.json({ msg });
  });
  console.log(req.body);
});

router.get('/balance/:acID', (req, res) => {
  try {
    const acID = req.params.acID;
    service.balance(acID, (bal) => {
      res.status(200).json({ bal });
    });
  } catch (error) {
    console.log(error);
  }
});

router.put('/deposit', (req, res) => {
  service.deposit(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

router.put('/withdraw', (req, res) => {
  service.withDraw(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

router.put('/transfer', (req, res) => {
  service.transfer(req.body, (msg) => {
    res.status(201).json({ sts: 'Succesful', msg });
  });
});

module.exports = router;
