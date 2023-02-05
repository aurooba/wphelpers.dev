const { readFile, writeFileSync } = require("fs-extra");
const { join } = require("path");
const { promisify } = require("util");
const glob = require("glob");
const set = require("lodash.set");
const asyncReadFile = promisify(readFile);
const asyncGlob = promisify(glob);
const { parse, sep } = require("path");
const asyncMap = (arr, callback) =>
	Promise.all(arr.map((...args) => callback(...args)));

/**
 * Gets the name for the object based on the path.
 * @param {string} path
 * @returns {string} name of the path
 */
function getName(path) {
	const parts = path.split(sep);
	if (parts.length) {
		const fileName = parts[parts.length - 1];
		parts[parts.length - 1] = parse(fileName).name;
	}
	parts[0] = "wp-block-" + parts[0];
	return parts;
}
/**
 * Parses the file with the given parser if provided or json.parse() by default.
 * @param {string} filePath
 * @param {function} parser
 * @returns {string} parsed JSON
 */
async function parseFile(filePath, parser = JSON.parse) {
	const buff = await asyncReadFile(filePath);
	const text = buff.toString();
	try {
		return parser(text);
	} catch (parseError) {
		throw new Error(`Couldn't parse ${filePath}. Error: ${parseError}`);
	}
}

/**
 * Matches the file path to the result object.
 * @param {object} result
 * @param {string} root
 * @param {string} filePath
 * @param {function} parser
 * @returns {object} result
 */
async function handleFile(result, root, filePath, parser) {
	const fullPath = join(root, filePath);
	const what = await parseFile(fullPath, parser);
	const where = getName(filePath);
	set(result, where, what);
	return result;
}

/**
 * Grab the block info from the block library src folder
 * @param {string} root - the root directory to search
 * @param {string} options - options for the glob search
 * @returns
 */
async function getBlockInfo(root, options = {}) {
	// get the options, set defaults
	const { parser, include = "*.json", exclude } = options;

	// get the files
	const matches = await asyncGlob(include, {
		// glob options: https://www.npmjs.com/package/glob#options
		ignore: exclude,
		cwd: root,
		mark: true,
		nocase: true,
		nodir: true,
		matchBase: true,
	});
	// process the files
	const result = {};
	await asyncMap(matches, (filePath) =>
		handleFile(result, root, filePath, parser),
	);

	return result;
}

exports.handler = async function (event, context) {
	const blockInfo = await getBlockInfo(
		"node_modules/@wordpress/block-library/src/",
		{ exclude: "block/block.json" },
	);
	// console.log(blockInfo);
	return {
		statusCode: 200,
		body: JSON.stringify(blockInfo),
	};
};
