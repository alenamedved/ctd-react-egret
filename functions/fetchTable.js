const fetch = require("node-fetch");

const { REACT_APP_AIRTABLE_API_KEY } = process.env;
const { REACT_APP_AIRTABLE_BASE_ID } = process.env;

const authorization = `Bearer ${REACT_APP_AIRTABLE_API_KEY}`;

exports.handler = async function (event, context) {
  let resp, sendBack;

  const tableName = event.queryStringParameters.todoCategory;
  const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  try {
    resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
    });
    sendBack = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: JSON.stringify(await resp.json()),
    };
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
