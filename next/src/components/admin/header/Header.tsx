"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Icon from "@/components/icons/Icon";
import "./Header.scss";

export default function Header() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const iconSize = 2;

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<header className="header w-100 d-flex justify-content-between align-items-center py-1">
			<h3 className="h3">Azura</h3>
			<ul className="d-flex justify-content-end gap-2">
				<li>
					<Button
						variant="icon"
						onClick={() => {
							setTheme(theme === "dark" ? "light" : "dark");
						}}
					>
						{mounted ? <Icon name={theme === "dark" ? "light" : "dark"} size={iconSize} /> : <Icon name={'light'} size={iconSize} />}
					</Button>
				</li>
				<li>
					<Button variant="icon">
						<Icon name="bell" size={iconSize} />
					</Button>
				</li>

				<li>
					<Button variant="icon">
						<Icon name="settings" size={iconSize} />
					</Button>
				</li>
				<li>
					<Button variant="icon">
						<Icon name="logout" size={iconSize} />
					</Button>
				</li>
			</ul>
		</header>
	);
}
