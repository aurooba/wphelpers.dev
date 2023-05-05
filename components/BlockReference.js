import dynamic from "next/dynamic";
import { useState } from "react";
import * as icons from "@wordpress/icons";

export default function BlockReference(blockObject) {
	const { block } = blockObject;
	const blockIcon = block.icon;
	const icon = icons[blockIcon];
	const title = block.title;
	const category = block.category;
	const description = block.description;
	const [displayProperties, setDisplayProperties] = useState(false);

	// create an object of all the properties of blockObject except icon, title, category and description
	const properties = Object.keys(block).reduce((object, key) => {
		if (
			key !== "icon" &&
			key !== "title" &&
			key !== "category" &&
			key !== "description"
		) {
			object[key] = block[key];
		}
		return object;
	}, {});
	const PropertyReference = dynamic(() => import("./JsonView.js"), {
		ssr: false,
	});

	// block.name without core/ prefix
	const blockName = block.name.replace("core/", "");

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
						onClick={() => setDisplayProperties(!displayProperties)}>
						{displayProperties ? "Hide Properties" : "Show Properties"}
					</button>
				</div>
			</div>
			{displayProperties && (
				<div
					className={`block-reference-${block.name} ${
						displayProperties
							? "block-reference--open"
							: "block-reference--closed"
					}`}
					key={"block-reference-open-" + block.name}>
					<header>
						<div className="block-reference__close">
							<button onClick={() => setDisplayProperties(false)}>
								<icons.Icon icon={icons.close} />
							</button>
						</div>

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
					<div className="block-content">
						<div className="block-reference__properties">
							{<PropertyReference data={properties} />}
						</div>
						<p className="block-reference__source">
							<a
								href={`https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src/${blockName}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
								</svg>
								Block source code on GitHub
							</a>
						</p>
					</div>
				</div>
			)}
		</>
	);
}
