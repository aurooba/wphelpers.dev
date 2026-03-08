import { cloneElement, useState } from "react";

export default function Repeater(props) {
	const { children, title } = props;
	const [repeaterCount, setRepeaterCount] = useState(1);

	// clone the children and add a key prop
	const ClonedChildren = () => {
		if (children.length) {
			return children.map((child, index) => {
				return cloneElement(child, { key: index });
			});
		} else {
			return cloneElement(children, { key: 0 });
		}
	};

	function handleRepeaterCountChange() {
		setRepeaterCount(repeaterCount + 1);
	}

	return (
		<div className="innerblocks-generator__repeater">
			<button
				type="button"
				id="repeater-count"
				name="repeater-count"
				onClick={handleRepeaterCountChange}>
				Add {title}
			</button>

			{
				// create an array of the repeaterCount length of the cloned children
				Array.from({ length: repeaterCount }, (v, key) => {
					return <ClonedChildren key={key} />;
				})
			}
		</div>
	);
}
