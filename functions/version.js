import fetch from "node-fetch";

const API_ENDPOINT = "http://api.wordpress.org/core/version-check/1.7/?";

exports.handler = async () => {
	const response = await fetch(API_ENDPOINT, {
		mode: "no-cors",
	})
		.then((response) => response.json())
		.then((data) => ({
			headers: {
				"Content-Type": "application/json",
			},
			statusCode: 200,
			contentType: "application/json",
			body: JSON.stringify(data["offers"][0]["version"]),
		}))
		.catch((error) => ({ statusCode: 422, body: String(error) }));
	return response;
};
