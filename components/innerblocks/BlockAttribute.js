import { useState } from "react";

export default function BlockAttribute(props) {
	const [blockAttribute, setBlockAttribute] = useState("");

	const { blockAttributes } = props;

	const blockAttributeOptions = Object.keys(blockAttributes).map(
		(attributeName) => {
			return {
				value: attributeName,
				label: attributeName + " (" + blockAttributes[attributeName].type + ")",
			};
		},
	);

	return (
		<div className="innerblocks-generator__block-attribute">
			<label htmlFor="block-attribute">Select a block attribute</label>
			<select
				name="block-attribute"
				id="block-attribute"
				value={blockAttribute}
				onChange={(event) => setBlockAttribute(event.target.value)}>
				{blockAttributeOptions.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
			<input
				type="text"
				name="block-attribute-value"
				id="block-attribute-value"
				placeholder="Enter a value"
				onChange={(event) => {
					// set the block attribute value
				}}
			/>
		</div>
	);
}
