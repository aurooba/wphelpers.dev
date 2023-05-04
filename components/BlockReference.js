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

	// recursive function to make objects and objects of objects into strings
	const stringify = (value) => {
		if (typeof value === "object" && value !== null) {
			// console.log(value);
			return Object.keys(value).map((key) => {
				return (
					<div
						className="block-reference__property"
						key={key + "-property-wrap"}>
						<span className="block-reference__property-key">{key}:</span>
						<span className="block-reference__property-value">
							{stringify(value[key])}
						</span>
					</div>
				);
			});
		} else {
			return value;
		}
	};

	return (
		<div
			className={`block-reference-${block.name} ${
				displayProperties ? "block-reference--open" : "block-reference--closed"
			}`}
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
			{displayProperties && (
				<div className="block-reference__content">
					<div className="block-reference__properties">
						{
							// map over the properties object and display the key and value
							Object.keys(properties).map((property) => {
								return (
									<div
										className="block-reference__property"
										key={property + "general-property-wrap"}>
										<span className="block-reference__property-key">
											{property}:
										</span>
										<div className="block-reference__property-value">
											{stringify(properties[property])}
										</div>
									</div>
								);
							})
						}
					</div>
				</div>
			)}
		</div>
	);
}
