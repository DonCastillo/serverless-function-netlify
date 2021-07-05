// can be accessed via domain/.netlify/functions/hello

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);


exports.handler = async (event, context) => {

    const method = event.httpMethod;

    if(method !== 'POST') {
        return {
            statusCode: 405,
            body: 'POST method only allowed'
        }
    }
    

    const {purchase, total_amount, shipping_fee} = JSON.parse(event.body);
    // console.log(purchase, total_amount, shipping_fee);
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee
    }
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(),
            currency: 'usd'
        });
        return {
            statusCode: 200,
            body: JSON.stringify({clientSecret: paymentIntent.client_secret})
        }
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message})
        }
    }
    
}