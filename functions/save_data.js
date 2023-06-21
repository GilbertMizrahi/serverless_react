const axios = require('axios')

exports.handler = async (event, context) => {
    const method = event.httpMethod

    if(method !== 'POST'){
        return {
            statusCode: 405,
            body: 'Only POST Requests Allowed'
        }
    }

    const { name, last, email, company, q1, textAreaValue } = JSON.parse(event.body) //event.queryStringParameters

    console.log(textAreaValue);

    const url = 'https://apis.twnel.io/google/create_records';
    const body = {
        "userProfileId": "16175435958_herencia",
        "spreadsheetId": "1ywRAIvHyB0Jf1weAYQLSEbHPEoN89os3xIQk-MFS7NU",
        "range": "'respuestas'!A1:G1000",
        "labels": ["nombre",	"apellido",	"correo", "empresa", "nps", "razon", "date"],
        "data": [{
          "nombre": name,
          "apellido": last,
          "correo": email,
          "empresa": company,
          "nps": q1,
          "razon": textAreaValue
         }],
         "addDate": true,
         "addDateLabel": "date",
         "locales": "es-CO",
         "formatDate": {
             "day":    "numeric",
             "month":  "numeric",
             "year":   "numeric",
             "hour":   "2-digit",
             "minute": "2-digit",
             "second": "2-digit",	
             "timeZone": "America/Bogota"
         },
         "msg": "Gracias, tu respuesta fue registrada"
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