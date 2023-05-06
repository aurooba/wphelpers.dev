/**
 * External dependencies
 */
import * as icons from "@wordpress/icons";

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
	const blockIcon = block.icon;
	const icon = icons[blockIcon];
	const title = block.title;
	const category = block.category;
	const description = block.description;

	return (
		<>
			<div
				className={`block-reference-${block.name}`}
				key={"block-reference-" + block.name}>
				<header>
					<h3 className="block-reference__title">
						{icon && <icons.Icon icon={icon} />}{" "}
						<span className="visually-hidden">Title: </span> {title}
					</h3>

					<div className="block-reference__category">
						<span className="visually-hidden">Category: </span>
						<span>{category}</span>
					</div>
					<p className="block-reference__description">{description}</p>
				</header>

				<div className="button-wrapper">
					<button
						className="block-reference__toggle-properties"
						onClick={() => setShowBlockProps(blockName)}>
						{blockName === setShowBlockProps
							? "Hide Properties"
							: "Show Properties"}
					</button>
				</div>
			</div>
			{blockName === showBlockProps && <BlockReference {...props} />}
		</>
	);
}
