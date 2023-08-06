/**
 * External dependencies
 */
import * as icons from "@wordpress/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Fathom from "fathom-client";

/**
 * Internal dependencies
 */
import BlockReference from "@components/BlockReference";

export default function BlockCard(props) {
	const {
		blockObject: block,
		showBlockProps,
		blockName,
		setShowBlockProps,
	} = props;
	const router = useRouter();
	const { block: setBlock, s: searchQuery } = router.query;
	const blockIcon = block.icon;
	const icon = icons[blockIcon];
	const category = block.category;
	const description = block.description;
	const isExperimental = true === block["__experimental"];
	// if blockName has deprecated in it, create a boolean true const
	const isDeprecated = block.title.includes("(deprecated)");
	// remove (deprecated) from title
	const titleWithoutDeprecated = block.title.replace("(deprecated)", "").trim();
	const [isCopied, setIsCopied] = useState(false);
	async function handleCopyClick(text) {
		Fathom.trackGoal("XTIKO2BV", 0);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1500);
		return await navigator.clipboard.writeText(text);
	}
	return (
		<>
			<div
				className={`block-reference-${block.name}`}
				key={"block-reference-" + block.name}>
				<header>
					<h3 className="block-reference__title">
						{icon && <icons.Icon icon={icon} />}
						<div className="block-reference__title-wrapper">
							<span className="visually-hidden">Title: </span>
							{titleWithoutDeprecated}
							<pre>
								<button
									onClick={() => {
										handleCopyClick(block.name);
									}}
									className="no-border copy-button">
									<span className="visually-hidden">Slug: </span>
									<span class="block-slug">{block.name}</span>

									<span className="visually-hidden">Click to copy</span>
									<icons.Icon
										icon={isCopied ? icons["check"] : icons["copy"]}
										size={16}
									/>
								</button>
							</pre>
						</div>
					</h3>
					<div className="block-reference__category">
						<span className="visually-hidden">Category: </span>
						<span>{category}</span>
						{isExperimental && (
							<span className="experimental">experimental</span>
						)}
						{isDeprecated && <span className="deprecated">deprecated</span>}
					</div>
					<p className="block-reference__description">{description}</p>
				</header>

				<div className="button-wrapper">
					<button
						className="block-reference__toggle-properties"
						onClick={() => {
							setShowBlockProps(
								blockName === showBlockProps ? false : blockName,
							);
							if (blockName === showBlockProps) {
								router.push(
									{ pathname: `/blocks`, query: { s: searchQuery } },
									"",
									{
										scroll: false,
									},
								);
							} else {
								Fathom.trackGoal("V1UXBPVW", 0);
								router.push(
									{
										pathname: `/blocks/${encodeURIComponent(blockName)}`,
										query: { s: searchQuery },
									},
									"",
									{
										scroll: false,
									},
								);
							}
						}}>
						{blockName === showBlockProps
							? "Hide Information"
							: "Expand Information"}
					</button>
				</div>
			</div>
			{blockName === showBlockProps && <BlockReference {...props} />}
		</>
	);
}
