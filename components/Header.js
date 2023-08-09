import HomeLink from "@components/HomeLink";
import { useRouter } from "next/router";

export default function Footer() {
	const router = useRouter();
	// get current path
	const path = router.pathname;
	console.log(path);
	const nav = [
		{
			href: "/blocks",
			name: "Blocks",
			isCurrentPath: path === "/blocks/[[...block]]",
		},
		{
			href: "/icons",
			name: "Icons",
			isCurrentPath: path === "/icons",
		},
		{
			href: "/api/core-blocks",
			name: "Blocks JSON",
			isCurrentPath: path === "/api/core-blocks",
		},
		{
			href: "https://wpaudit.site",
			name: "WPAudit",
			isCurrentPath: path === "https://wpaudit.site",
		},
	];
	return (
		<>
			<header className="main-header">
				<nav>
					<HomeLink />
					{
						// iterate over nav array to create a nav item for each
						nav.map((navItem) => (
							<a
								key={navItem.href}
								href={navItem.href}
								className={navItem.isCurrentPath ? "current-page" : ""}>
								{navItem.name}
							</a>
						))
					}
				</nav>
			</header>
		</>
	);
}
