// can be accessed via domain/.netlify/functions/hello
require('dotenv').config
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appyhePnrOWXrYuVo')
  .table('products')
 
airtable.list().then(resp => {
  console.log(resp)
})
 
airtable.list({
  filterByFormula: `NOT({Feature} = '')`, // optional
  maxRecords: 200, // optional
  pageSize: 100, // optional 
  sort: [{ field: 'name', direction: 'asc' }], // optional
  view: 'Airtable View', // optional
  cellFormat: 'json'
});



exports.handler = async (event, context) => {
    try {
        const {records} = await airtable.list()
        const products = records.map(product => {
            const {id} = product;
            const {name, image, price} = product.fields;
            const url = image[0].url;
            return {id, name, url, price};
        });
        return {
            statusCode: 200,
            body: JSON.stringify(products),
            headers: {
                'Content-Type': 'application/json'
            }
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: 'Server Error'
        }
    }
    
}