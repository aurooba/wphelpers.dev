const { readFile, writeFileSync, readFileSync } = require("fs-extra");
const { join } = require("path");
const { promisify } = require("util");
const glob = require("glob");
const set = require("lodash.set");
const asyncReadFile = promisify(readFile);
const asyncGlob = promisify(glob);
const { parse, sep } = require("path");
const asyncMap = (arr, callback) =>
	Promise.all(arr.map((...args) => callback(...args)));

exports.handler = async function (event, context) {
	// get the version from the package.json file sitting at node_modules/@wordpress/block-library
	const blockLibraryPath = join("node_modules", "@wordpress", "block-library");
	const packageJsonPath = join(blockLibraryPath, "package.json");
	const packageJson = await asyncReadFile(packageJsonPath, "utf8");
	const blockLibraryInfo = JSON.parse(packageJson);

	return {
		headers: {
			"Content-Type": "application/json",
		},
		statusCode: 200,
		body: JSON.stringify(blockLibraryInfo.version),
	};
};
