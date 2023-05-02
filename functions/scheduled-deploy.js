import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

// This is a sample build hook URL
const BUILD_HOOK = "https://api.netlify.com/build_hooks/63df361be4658526ab374a75";

// Schedules the handler function to run at midnight on
// Mondays, Wednesday, and Friday
const handler = schedule("0 0 * * 1", async () => {
	await fetch(BUILD_HOOK, {
		method: "POST",
	}).then((response) => {
		console.log("Build hook response:", response);
	});

	return {
		statusCode: 200,
	};
});

export { handler };
