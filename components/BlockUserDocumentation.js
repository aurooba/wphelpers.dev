/**
 * External dependencies
 */
import * as icons from "@wordpress/icons";
import { useEffect, useState } from "react";
import { blockDocumentationOverrides } from "../utils/block-documentation.json-overrides.js";

export default function BlockUserDocumentation(props) {
	const { blockName } = props;
	const [documentationUrl, setDocumentationUrl] = useState(false);
	const url = `https://wordpress.org/support/article/${blockName}-block/`;
	useEffect(() => {
		const url = `https://wordpress.org/documentation/article/${blockName}-block/`;
		fetch("/api/urlExist?url=" + url)
			.then(async (response) => response.json())
			.then((response) => {
				if (response === 200) {
					setDocumentationUrl(true);
				} else {
					if (
						blockDocumentationOverrides[blockName] &&
						"" !== blockDocumentationOverrides[blockName]
					) {
						setDocumentationUrl(true);
					}
					setDocumentationUrl(false);
					console.log(response);
				}
			})
			.catch((error) => {
				console.log("error: " + error);
			});
	}, []);
	return (
		<>
			{documentationUrl && (
				<p className="block-reference__source">
					<a href={url}>
						<icons.Icon icon={icons.wordpress} />
						Block documentation on WordPress.org
						<icons.Icon icon={icons.external} />
					</a>
				</p>
			)}
		</>
	);
}
