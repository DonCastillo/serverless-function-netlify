// can be accessed via domain/.netlify/functions/hello

require('dotenv').config
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appyhePnrOWXrYuVo')
  .table('products')


exports.handler = async (event, context) => {
    const {id} = event.queryStringParameters;
    if(id) {
        try {
            const product = await airtable.retrieve(id);
            if(product.error) {
                return {
                    statusCode: 404,
                    body: `No product with an id of ${id}`
                }
            }
            return {
                statusCode: 200,
                body: JSON.stringify(product),
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
        
    } else {
        return {
            statusCode: 400,
            body: 'Please provide product id'
        }
    }
    
}