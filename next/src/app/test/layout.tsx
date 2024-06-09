import "@/assets/scss/style.scss";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				{children}
			</body>
		</html>
	);
}
