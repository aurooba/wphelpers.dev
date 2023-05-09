import { useState } from "react";
import TemplateBlock from "./TemplateBlock";
import Repeater from "../Repeater";
export default function InnerBlocksGenerator() {
	const [templateType, setTemplateType] = useState("php");

	return (
		<>
			<div className="innerblocks-generator">
				<div className="innerblocks-generator__template-type-options">
					<div className="innerblocks-generator__template-type-option">
						<input
							type="radio"
							id="php"
							name="templateType"
							value="php"
							checked={templateType === "php"}
							onChange={() => setTemplateType("php")}
						/>
						<label htmlFor="php">PHP</label>
					</div>
					<div className="innerblocks-generator__template-type-option">
						<input
							type="radio"
							id="jsx"
							name="templateType"
							value="jsx"
							checked={templateType === "jsx"}
							onChange={() => setTemplateType("jsx")}
						/>
						<label htmlFor="jsx">JSX</label>
					</div>
				</div>
				<Repeater title="Block">
					<TemplateBlock />
				</Repeater>
			</div>
		</>
	);
}
