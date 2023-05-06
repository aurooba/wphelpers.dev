/**
 * External dependencies
 */
import * as icons from "@wordpress/icons";
import { useRouter } from "next/router";

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
	const blockIcon = block.icon;
	const icon = icons[blockIcon];
	const category = block.category;
	const description = block.description;
	const isExperimental = true === block["__experimental"];
	// if blockName has deprecated in it, create a boolean true const
	const isDeprecated = block.title.includes("(deprecated)");
	// remove (deprecated) from title
	const titleWithoutDeprecated = block.title.replace("(deprecated)", "").trim();

	return (
		<>
			<div
				className={`block-reference-${block.name}`}
				key={"block-reference-" + block.name}>
				<header>
					<h3 className="block-reference__title">
						{icon && <icons.Icon icon={icon} />}{" "}
						<span className="visually-hidden">Title: </span>{" "}
						{titleWithoutDeprecated}
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
							router.push(`/blocks/${encodeURIComponent(blockName)}`, "", {
								scroll: false,
							});
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
