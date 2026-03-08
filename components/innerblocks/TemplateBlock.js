import { useEffect, useState } from "react";
import BlockAttribute from "./BlockAttribute";
import Repeater from "../Repeater";

export default function TemplateBlock(props) {
	const { blocksObject } = props;
	const [selectedBlock, setSelectedBlock] = useState(false);

	// get the attributes of the selectedBlock from the blocksObject
	const selectedBlockAttributes = selectedBlock
		? blocksObject[selectedBlock]["block"].attributes
		: false;

	// create an options array from the blocksObject with the block names as the values and name as labels
	const options = Object.keys(blocksObject).map((blockName) => {
		return {
			value: blockName,
			label: blocksObject[blockName]["block"].title,
		};
	});
	return (
		<div className="innerblocks-generator__template-block">
			<label htmlFor="template-block">Select a block</label>
			<select
				name="template-block"
				id="template-block"
				onChange={(event) => setSelectedBlock(event.target.value)}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
			{selectedBlockAttributes && (
				<Repeater title="Attribute">
					<BlockAttribute blockAttributes={selectedBlockAttributes} />
				</Repeater>
			)}
		</div>
	);
}
