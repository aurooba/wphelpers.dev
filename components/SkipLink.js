export default function SkipLink({ href, text = "Skip to content" }) {
	return (
		<a href={href} className="visually-hidden skip-link">
			{text}
		</a>
	);
}
