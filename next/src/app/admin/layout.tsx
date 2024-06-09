import "@/assets/scss/style.scss";
import ThemeProvider from "@/context/theme";
import ContextProvider, { Context } from "@/context/context";

async function fetchApps() {
	let data = null;
	try {
		data = await fetch("http://127.0.0.1:8000/api/params/").then((res) => res.json());
	} catch (error) {
		console.log(error);
	}
	return { data };
}

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	const params = await fetchApps();
	console.log(params);

	return (
		<ThemeProvider>
			<ContextProvider>
				<div className="">Admin</div>
			</ContextProvider>
		</ThemeProvider>
	);
}
