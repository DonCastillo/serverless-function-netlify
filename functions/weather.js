// can be accessed via domain/.netlify/functions/hello
require('dotenv').config();
const axios = require('axios');
const url = `http://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric&q=`;

exports.handler = async (event, context) => {
    const method = event.httpMethod.toLowerCase();

    switch(method){
        case 'post': {
            try {
                const {city} = JSON.parse(event.body);
                const resp = await axios.get(`${url}${city}`);
                return {
                    statusCode: 200,
                    body: JSON.stringify(resp.data)
                }
            } catch (error) {
                return {
                    statusCode: 404,
                    body: JSON.stringify(error)
                }    
            }
        }
            break;
        default: {
            return {
                statusCode: 405,
                body: 'Only POST Request Allowed'
            }
        }   
            break;
    }
}