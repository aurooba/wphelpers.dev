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
	parts[0] = parts[0];
	return parts;
}
/**
 * Parses the file with the given parser if provided or json.parse() by default.
 * @param {string} filePath
 * @param {function} parser
 * @returns {string} parsed JSON
 */
function parseFile(filePath, parser = JSON.parse) {
	const buff = readFileSync(filePath);
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
function handleFile(result, root, filePath, parser) {
	const fullPath = join(root, filePath);
	const what = parseFile(fullPath, parser);
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
function getBlockInfo(root, options = {}) {
	// get the options, set defaults
	const { parser, include = "*.json", exclude } = options;

	// get the files
	const matches = glob.sync(include, {
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
	// asyncMap(matches, (filePath) => handleFile(result, root, filePath, parser));
	matches.map((filePath) => handleFile(result, root, filePath, parser));

	return result;
}

// function to get the block icon from the index.js file in the block folder of the given block
function getBlockIcon(blockName) {
	const blockPath = `node_modules/@wordpress/block-library/src/${blockName}/index.js`;
	const blockFile = readFileSync(blockPath);
	const blockFileString = blockFile.toString();
	const blockFileArray = blockFileString.split("\n");

	// find the line that includes @wordpress/icons and get the icon name
	const iconLine = blockFileArray.find((line) =>
		line.includes("@wordpress/icons"),
	);
	// get first word after the opening curly brace in iconLine
	const iconTerm = undefined !== iconLine ? iconLine.split("{ ")[1] : null;
	// remove everything after the first space in iconTerm
	const icon = null !== iconTerm ? iconTerm.split(" ")[0] : null;
	// if the block is navigation link console log the iconLine

	return icon;
}

exports.handler = async function (event, context) {
	const blockInfo = getBlockInfo("node_modules/@wordpress/block-library/src/", {
		exclude: ["block/block.json", "missing/block.json"],
	});

	// iterate through the blockInfo object and add the block icon to the object from the index.js file in the block folder
	for (const [key, value] of Object.entries(blockInfo)) {
		const blockName = key;
		// if the icon is not already set get the icon
		if (!blockInfo[blockName].block.icon) {
			const blockIcon = getBlockIcon(blockName);
			blockInfo[blockName].block.icon = blockIcon;
		}
		// console.log(blockIcon);
	}
	return {
		headers: {
			"Content-Type": "application/json",
		},
		statusCode: 200,
		body: JSON.stringify(blockInfo),
	};
};
