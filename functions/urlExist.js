import fetch from "node-fetch";
exports.handler = async function (event, context) {
	// get the provided url and check if it exists and doesn't return a 404, 500, etc.
	const url = event.queryStringParameters.url;
	const response = await fetch(url, {
		method: "HEAD",
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	})
		.then((response) => ({
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			contentType: "application/json",
			body: JSON.stringify(response.status),
		}))
		.catch((error) => ({ statusCode: 422, body: String(error) }));
	return response;
};
