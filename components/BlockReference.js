/**
 * External Dependencies
 */
import * as icons from "@wordpress/icons";
import { useEffect, useRef } from "react";
/**
 * Internal Dependencies
 */
import dynamic from "next/dynamic";
import { GitHub } from "./icons/github.js";

export default function BlockReference(props) {
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
	const scrollToRef = useRef(null);
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

	useEffect(() => {
		if (null !== scrollToRef.current) {
			scrollToRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [blockName === showBlockProps]);

	return (
		<>
			<div
				id={`block-reference-${block.name}`}
				className={`block-reference-${block.name} ${
					blockName === showBlockProps
						? "block-reference--open"
						: "block-reference--closed"
				}`}
				key={"block-reference-open-" + block.name}
				ref={scrollToRef}>
				<header>
					<div className="block-reference__close">
						<button onClick={() => setShowBlockProps(false)}>
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
							<GitHub />
							Block source code on GitHub
						</a>
					</p>
				</div>
			</div>
		</>
	);
}
