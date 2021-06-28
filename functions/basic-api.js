const items = require('../assets/data');


exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
}