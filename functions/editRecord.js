const fetch = require("node-fetch");
const { useDebugValue } = require("react");

const { REACT_APP_AIRTABLE_API_KEY } = process.env;
const { REACT_APP_AIRTABLE_BASE_ID } = process.env;

const authorization = `Bearer ${REACT_APP_AIRTABLE_API_KEY}`;

exports.handler = async function (event, context) {
  let resp, sendBack;
  console.log(event);
  const tableName = event.queryStringParameters.todoCategory;
  const id = event.queryStringParameters.id;
  const value = event.queryStringParameters.value;
  const statusStr = event.queryStringParameters.status;
  const status = statusStr === 'false' ? false : true
  console.log(typeof statusStr, 'and', statusStr )
console.log(status)
console.log(value)
console.log(typeof value)
  const url = `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(
    tableName)}`;

if(value === 'undefined') {
    console.log('first if')
    try {
        resp = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: [
              {
                id: id,
                fields: {
                  isCompleted: status,
                },
              },
            ],
          }),
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
} else if (value !== 'undefined') {
    console.log('second if')
    try {
      resp = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              id: id,
              fields: {
                Title: value,
                
              },
            },
          ],
        }),
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
    
  
}};
