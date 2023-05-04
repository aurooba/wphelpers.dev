import { useState } from "react";
import * as icons from "@wordpress/icons";

export default function BlockReference(blockObject) {
	const { block } = blockObject;
	const blockIcon = block.icon;
	const icon = icons[blockIcon];
	const title = block.title;
	const category = block.category;
	const description = block.description;

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
			console.log(value);
			return Object.keys(value).map((key) => {
				return (
					<p className="block-reference__property">
						<span className="block-reference__property-key">{key}:</span>
						<span className="block-reference__property-value">
							{stringify(value[key])}
						</span>
					</p>
				);
			});
		} else {
			return value;
		}
	};

	return (
		<div className={`block-reference-${block.name}`} key={block.name}>
			<div className="block-reference__icon">
				{icon && <icons.Icon icon={icon} />}
			</div>
			<div className="block-reference__content">
				<p className="block-reference__category">{category}</p>
				<h3 className="block-reference__title">{title}</h3>
				<p className="block-reference__description">{description}</p>
				<div className="block-reference__properties">
					{
						// map over the properties object and display the key and value
						Object.keys(properties).map((property) => {
							return (
								<p className="block-reference__property">
									<span className="block-reference__property-key">
										{property}:
									</span>
									<span className="block-reference__property-value">
										{stringify(properties[property])}
									</span>
								</p>
							);
						})
					}
				</div>
			</div>
		</div>
	);
}
