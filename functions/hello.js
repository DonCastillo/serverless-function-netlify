// can be accessed via domain/.netlify/functions/hello

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: 'Our First Netlify Function Example'
    }
}