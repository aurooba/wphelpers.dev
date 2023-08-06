export default function Search({ labels, searchIn, searchBy }) {
	const { s: searchQuery } = router.query;
	const [search, setSearch] = useState(
		"" !== searchQuery && undefined !== searchQuery ? searchQuery : "",
	);
	const [quantityFound, setQuantityFound] = useState(null);
	function handleSearch(event) {
		setSearch(event.target.value);
		let query = { ...router.query, s: event.target.value };
		if ("" === event.target.value) {
			delete query.s;
		}

		router.push(
			{
				query,
			},
			undefined,
			{
				...router.options,
				shallow: true,
			},
		);
	}
	function filterbySearch(searchParam = search) {
		const objectSearch =
			"" !== searchParam ? searchBy.includes(searchParam.toLowerCase()) : false;

		return objectSearch ? true : false;
	}
	useEffect(() => {
		setQuantityFound(
			Object.keys(searchIn).filter((block) => {
				return "" !== search ? filterbySearch(block) : true;
			}).length,
		);
	}, [search, searchIn]);
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search by block name, keyword, or category."
				value={search}
				onChange={handleSearch}
				className="search-input"
			/>
			{"" !== search && (
				<div className="blocks-found-quantity">
					{1 === quantityFound
						? `1 ${labels.single} found.`
						: `${quantityFound} ${labels.plural} found.`}
				</div>
			)}
		</div>
	);
}
