import ReactJson from "react-json-view";

export default function JsonView(data) {
	return (
		<div className="json-view">
			<ReactJson
				src={data.data}
				collapsed={1}
				displayObjectSize={false}
				displayDataTypes={false}
				name="block.json"
			/>
		</div>
	);
}
