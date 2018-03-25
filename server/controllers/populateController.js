const elasticsearch = require('elasticsearch');
const client = require('../connection');
const { getBrands, getModels } = require('node-car-api');

module.exports = async function (req, res) {
    let records = [];
    const brands = await getBrands();
    const totalLength = brands.length;
    console.log('Preparing query body...')
    for (let [index, brand] of brands.entries()) {
        const models = await getModels(brand);
        records = records.concat(models);
        console.log(`${index + 1}/${totalLength} brand added to query json!`);
    }
    console.log('Preparing query...');
    let reqBody = [];
    records.forEach(record => {
        reqBody.push({
            index: {
                _index: 'cars',
                _type: 'car',
                _id: record.uuid
            }
        });
        reqBody.push(record);
    });
    console.log('Starting indexing in elasticsearch')
    client.bulk({ body: reqBody })
        .then((resp) => { res.send(resp) })
        .catch((err) => { res.send(err) });
}