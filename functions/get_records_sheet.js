const axios = require('axios')

exports.handler = async (event, context) => {
    const method = event.httpMethod

    if(method !== 'POST'){
        return {
            statusCode: 405,
            body: 'Only POST Requests Allowed'
        }
    }

    const { uid } = JSON.parse(event.body) //event.queryStringParameters

    console.log(uid);

    const url = 'https://apis.twnel.io/google/get_records';
    const body = {
        "userProfileId": "16175435958_herencia",
        "spreadsheetId": "1ywRAIvHyB0Jf1weAYQLSEbHPEoN89os3xIQk-MFS7NU",
        "range": "'Sheet1'!A1:F1000",
        "labels": ["estado","nombre","apellido",	"correo", "empresa", "uid"],
        "query": {
            "uid": [uid]
        },
           "returnOnly": "firstMatch"
      }

    try {
        getSolution = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = getSolution.data
        console.log(result);
        return  {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        
    } catch (error) {
        console.log(error.response);
        const errorMsg = error.response;
        // throw error;
        return {
            statusCode: 500,
            error: error.message
        } 
    }
}