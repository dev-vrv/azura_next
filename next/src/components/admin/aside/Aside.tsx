"use client";

import Icon from "@/components/icons/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "@/context/context";
import { Button } from "react-bootstrap";
import { IContext } from "@/context/context";
import "./Aside.scss";




export default function Aside({ api }: { api: IContext }) {
	const { setContext } = useContext(Context);
	
	useEffect(() => {
		setContext(api);
	}, [setContext, api]);


	const  AsideNav = ({ apps }: { apps: string[] }) => {
		const pathname = usePathname();

		const Li = ({ app, icon }: { app: string; icon: string }) => {
			const app_url = `/admin/${app}`;
			
			let active = false;
			app === "" ? active = pathname === "/admin" : active = pathname.includes(app);

			return (
				<li className="aside__item">
					<Link href={app_url} className={`aside__link ${active ? "active" : ""}`}>
						<Icon name={icon} size={2} />
					</Link>
				</li>
			);
		};

	return (
		<nav className="d-flex flex-column justify-content-center h-100">
			<ul className="aside__menu d-flex flex-column gap-3">
				{api.apps && api.apps.length > 0 && (
					api.apps.map((app: string, i: number) => (
						<Li key={i} app={app} icon={app} />
					))
				)}
			</ul>
		</nav>
	);
}

	return (
		<aside className="aside d-flex flex-column align-items-center justify-content-between h-100 py-3">
			<h5 className="d-flex">
				<Icon name="logo" size={1} />
			</h5>
			{api.apps && api.apps.length > 0 && (
				<AsideNav apps={api.apps} />
			)}
			<div className="aside__footer">
				<Button variant="icon">
					<Icon name="info" size={4} />
				</Button>
			</div>
		</aside>
	);
}

