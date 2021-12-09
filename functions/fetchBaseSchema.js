import fetch from "node-fetch";
import fs from 'node:fs/promises';

export async function handler(event, context, callback) {
  let resp, sendBack;
  const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables`;
  console.log(event)
  
  try {
    resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
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
