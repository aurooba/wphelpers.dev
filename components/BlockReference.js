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
					</div>
				</div>
			)}
		</>
	);
}
