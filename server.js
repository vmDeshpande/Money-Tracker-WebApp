const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.myrx1fv.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/addTransaction', async (req, res) => {
//   const { description, amount, type } = req.body;

  const newTransaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    type: req.body.type,
  });

  await newTransaction.save();

  res.redirect('/');
});

app.get('/getTransactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
