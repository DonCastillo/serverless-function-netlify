require('dotenv').config
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appyhePnrOWXrYuVo')
  .table('survey')


exports.handler = async (event, context) => {
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
    return {
        statusCode: 400,
        body: 'Survey'
    }

}