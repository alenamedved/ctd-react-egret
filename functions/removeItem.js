const fetch = require("node-fetch");

const { REACT_APP_AIRTABLE_API_KEY, REACT_APP_AIRTABLE_BASE_ID } = process.env;

const authorization = `Bearer ${REACT_APP_AIRTABLE_API_KEY}`;

exports.handler = async function (event, context) {
  let resp, sendBack;

  const tableName = event.queryStringParameters.todoCategory;
  const id = event.queryStringParameters.id;

  const deleteRecordList =
    "?records[]=" + id.toString().replace(/,/gi, "&records[]=");

  const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(
    tableName
  )}/${deleteRecordList}`;

  try {
    resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
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

    console.log("Error (from catch): ");
    console.log(errObj);

    return {
      statusCode: errObj.statusCode,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errBody),
    };
  }
};
