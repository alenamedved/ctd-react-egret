exports.handler = async function(event, context) {
    return {
        headers: {
            "Content-Type": "application/json",
          },
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}