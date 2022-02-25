const fetch = require("node-fetch");

const API_ENDPOINT = "http://api.wordpress.org/core/version-check/1.7/?";

exports.handler = async () => {
	const response = await fetch(API_ENDPOINT, {
		mode: "no-cors",
	})
		.then((response) => response.json())
		.then((data) => ({
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
			statusCode: 200,
			body: JSON.stringify(data["offers"][0]),
		}))
		.catch((error) => ({ statusCode: 422, body: String(error) }));
	return response;
};
