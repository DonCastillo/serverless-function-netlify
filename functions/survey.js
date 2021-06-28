require('dotenv').config
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appyhePnrOWXrYuVo')
  .table('survey')


exports.handler = async (event, context) => {
    const method = event.httpMethod.toLowerCase();
    console.log(method);

    switch(method){
        case 'put': {
            try {
                const {id, votes} = JSON.parse(event.body);
                console.log(id, votes)
                if(!id || votes === null || votes === undefined ) {
                    return {
                        statusCode: 400,
                        body: 'Please provide id and votes values'
                    }
                }
                const fields = {votes:Number(votes)+1};
                const item = await airtable.update(id, {fields});
                console.log(item)
                if(item.error){
                    return {
                        statusCode: 400,
                        body: JSON.stringify(item)
                    }
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify(item)
                }
            } catch (error) {
                return {
                    statusCode: 400,
                    body: 'Please provide id and votes values'
                }
            }
        }
            break;
        case 'get': {
            try {
                const {records} = await airtable.list();
                const survey = records.map(item => {
                    const {id} = item;
                    const {room, votes} = item.fields;
                    return {id, room, votes}
                })
                return {
                    statusCode: 200,
                    body: JSON.stringify(survey),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            } catch (error) {
                return {
                    statusCode: 500,
                    body: 'Survey Error'
                }
            }
        }
            break;
        default: {
            return {
                statusCode: 405,
                body: 'Only GET and PUT Requests Allowed'
            }
        }
            break;
    }
    // console.log(event)
    
    return {
        statusCode: 400,
        body: 'Survey'
    }

}