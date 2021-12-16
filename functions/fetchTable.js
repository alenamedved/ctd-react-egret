const fetch = require("node-fetch");

const { REACT_APP_AIRTABLE_API_KEY, REACT_APP_AIRTABLE_BASE_ID , CLIENT_SECRET} = process.env;


const authorization = `Bearer ${REACT_APP_AIRTABLE_API_KEY}`;

exports.handler = async function (event, context) {
  let resp
  let sendBack = {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
    
  };
  const token = event.queryStringParameters.token;
  if(!token || token !== CLIENT_SECRET ) {
    sendBack.body = JSON.stringify({
      records: []
    })
    return sendBack 
  }
  const tableName = event.queryStringParameters.todoCategory;

  const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  try {
    resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    sendBack.body = JSON.stringify(await resp.json())
    
    return sendBack;
  } catch (errObj) {
    const errBody = {
      err_msg: errObj.message,
    };

    console.log(errObj);

    return {
      statusCode: errObj.statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errBody),
    };
  }
};
