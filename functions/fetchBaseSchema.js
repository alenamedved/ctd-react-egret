/* import fetch from "node-fetch"; */
const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  let resp, sendBack;
  const url = `https://api.airtable.com/v0/meta/bases`;
 /*  console.log(event) */
   

  try {
     resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: 'Bearer keyJriDpHL4TsAakG',
      },
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
