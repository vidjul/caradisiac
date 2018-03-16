//const fs = require('fs');
// const { getModels, getBrands } = require('node-car-api');

// async function getRecords() {
//     const brands = await getBrands();
//     let modelsPromise = [];
//     for (let brand of brands) {
//         modelsPromise.push(await getModels(brand));
//     }
//     Promise.all(modelsPromise)
//         .then((res) => fs.writeFileSync('result.json',JSON.stringify(res),'UTF8',(err) => {
//             if(err) {
//                 console.log(err);
//             }
//             console.log('OK!');
//         }))
//         .catch((err) => console.log(err));
// }

//getRecords();

const express = require('express');
const populate = require('./controllers/populateController');
const app = express();

// app.get('/populate', (req,res) => {
//     populate(req,res);
// });

app.get('/populate', populate(req,res));

app.listen(3000, () => {
    console.log('Server has started!');
});
