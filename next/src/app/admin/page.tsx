"use client";

import { Spinner } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { Context } from "@/context/context";

export default function PageHome() {
	const pathname = usePathname();
	const appName = pathname.split("/").filter((part) => part !== "" && part !== "admin")[0];
	const { context } = useContext(Context);

	return (
		<main className="main">
			<section className="section d-flex flex-column justify-content-between">
				<div className="section__header">
					<h5>Model {appName}</h5>
				</div>
				<div className="section__body"></div>
				<div className="section__footer"></div>
			</section>
		</main>
	);
}
