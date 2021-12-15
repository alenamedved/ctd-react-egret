const fetch = require('node-fetch')
/** The next 2 lines refer to environment variables configured in Netlify settings (found in "Site settings > Build & deploy > Environment" as of this writing) */
const { REACT_APP_AIRTABLE_API_KEY } = process.env
const { REACT_APP_AIRTABLE_BASE_ID } = process.env

const authorization = `Bearer ${REACT_APP_AIRTABLE_API_KEY}`;

exports.handler = async function(event, context) {
  let resp, sendBack;

  const tableName = event.queryStringParameters.todoCategory
  const newTodo = event.queryStringParameters.newTodo

  const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;
    
  try {
     resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Title: newTodo,
            },
          },
        ], 
      })
    });
    sendBack = {
        headers: {
          "Content-Type": "application/json",
        },
      statusCode: 200,
      body: JSON.stringify( await resp.json()),
    }; 
    return sendBack;
  } catch (errObj) {
    const errBody = {
      err_msg: errObj.message,
    };

    console.log("Error (from catch): ");
    console.log(errObj);

    return {
      statusCode: errObj.statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errBody),
    };
  }
}
