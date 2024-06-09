"use client";

import "./AppTable.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Form from 'react-bootstrap/Form';


interface PropsAppTable {
	appName: string;
	selectable?: boolean;
}

interface IRestPaginationList {
	count: number;
	next: string;
	previous: string;
	results: any[];
}

export default function AppTable({ appName, selectable }: PropsAppTable) {
	const { context } = useContext(Context);

	const [data, setData] = useState<IRestPaginationList | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [displayFields, setDisplayFields] = useState<string[]>([]);


	const FetchData = useCallback(async () => {
		setError(false);
		if (context.endpoints) {
			const action = context.endpoints[appName]['items'];
			try {
				const url = ``;
				const res = await fetch(url);
				console.log(res);
				const data = await res.json();
				setData(data);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		}
	}, [appName, context]);

	useEffect(() => {
		if (loading) {
			// FetchData();
		}
	}, [context, FetchData, loading]);


	const THead = () => {
		return (
			<thead>
				<tr>
				{selectable && (
					<th>
						<Form.Check />
					</th>
				)}
				{/* {displayFields.map((field, index) => (
					<th className="text-capitalize" key={index}>
						<span>{field.replace('_', ' ')}</span>
					</th>
				))} */}
				</tr>
			</thead>
		);
	};

	const TBody = () => {
		return (
			<tbody>

			</tbody>
		);
	}

	return (
		<div className="app-table">
			<div className="d-flex justify-content-between align-items-center">
				<h4 className="text-capitalize">{appName}</h4>
				<div className="d-flex">
					<Button variant="icon" onClick={() => setLoading(true)}>
						<Icon name="redo" size={3} />
					</Button>
					<Button variant="icon">
						<Icon name="plus" size={3} />
					</Button>
				</div>
			</div>
			<Table striped bordered hover responsive>
				<THead />
				<TBody />
			</Table>
		</div>
	);
}
