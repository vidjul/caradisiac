const express = require('express');
const populate = require('./controllers/populateController');
const suv = require('./controllers/suvController');
const app = express();

app.get('/populate', (req,res) => {
    populate(req,res);
});

app.get('/suv', (req,res) => {
    suv(req,res);
});

app.listen(9292, () => {
    console.log('Server has started!');
});
