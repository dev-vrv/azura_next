"use client";

import "./AppTable.scss";
import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import context from "react-bootstrap/esm/AccordionContext";

interface IRestPaginationList {
	count: number;
	next: string;
	previous: string;
	page_count: number;
	page_size: number;
	results: any[];
}

export interface ITableEndpoint {
	url: string;
	method: string;
	fields_display: string[];
	fields_link: string[];
}

export interface ITable {
	appName: string;
	endPoint: ITableEndpoint;
}

export default function AppTable({ appName, endPoint }: ITable) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState<IRestPaginationList | null>(null);
	const [selected, setSelected] = useState<number[]>([]);
	const [allSelected, setAllSelected] = useState(false);
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState<string[]>([]);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch(`${endPoint.url}?page=${page}`);
			const data = await response.json();
			setData(data);
			console.log(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [endPoint, page, setLoading, setError, setData]);

	const handleSelectAll = useCallback(() => {
		if (allSelected) {
			setSelected([]);
			setAllSelected(false);
		} else {
			const allIds = data?.results.map(result => result.id);
			setSelected(allIds || []);
			setAllSelected(true);
		}
	}, [allSelected, data, setSelected, setAllSelected]);

	const handleSelect = (id: number) => {
		setSelected(prevSelected => {
			const isSelected = prevSelected.includes(id);
			if (isSelected) {
				const newSelected = prevSelected.filter(item => item !== id);
				if (allSelected) setAllSelected(false);
				return newSelected;
			} else {
				const newSelected = [...prevSelected, id];
				if (newSelected.length === data?.results.length) setAllSelected(true);
				return newSelected;
			}
		});
	};

	const THead = useCallback(() => {
		return (
			<thead>
				<tr>
					<th>
						<Form.Check name="all" checked={allSelected} onChange={handleSelectAll} />
					</th>
					{endPoint.fields_display.map((field, index) => {
						return (
							<th key={index}>
								<p className="d-inline-flex align-items-center gap-1">
									<span>{field.replace("_", " ")}</span>
									<p className="d-inline-flex align-items-center gap-1">
										<Button variant="icon-sm" onClick={() => {}}>
											<Icon className="d-inline-flex" name="up" size={5} />
										</Button>
										<Button variant="icon-sm" onClick={() => {}}>
											<Icon className="d-inline-flex" name="down" size={5} />
										</Button>
									</p>
								</p>
							</th>
						);
					})}
				</tr>
			</thead>
		);
	}, [endPoint, allSelected, handleSelectAll]);

	const TData = () => {
		return data?.results.map((result, index) => {
			const isChecked = selected.includes(result.id);
			return (
				<tr key={index}>
					<td>
						<Form.Check
							checked={isChecked}
							onChange={() => handleSelect(result.id)}
							name={result['id']}
						/>
					</td>
					{endPoint.fields_display.map((field, index) => {
						if (endPoint.fields_link.includes(field)) {
							return (
								<td key={index}>
									<Link href={`/admin/${appName}/${result.id}`}>{result[field]}</Link>
								</td>
							);
						} else if (typeof result[field] === "boolean") {
							return (
								<td key={index}>
									{result[field] ? (
										<Icon name="check" variant="success" size={5} />
									) : (
										<Icon name="notCheck" variant="danger" size={5} />
									)}
								</td>
							);
						} else if (typeof result[field] === "number" || typeof result[field] === "string") {
							return <td key={index}>{result[field]}</td>;
						} else {
							return <td key={index}>{"--"}</td>;
						}
					})}
				</tr>
			);
		});
	};

	const TBody = () => {
		return (
			<tbody>
				{!loading && !error && data && <TData />}
				{loading && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<div className="d-flex justify-content-center align-items-center">
								<Spinner animation="grow" role="status" />
							</div>
						</td>
					</tr>
				)}
				{!loading && !error && data && data.results.length === 0 && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<div className="d-flex justify-content-center align-items-center">
								<p>No data</p>
							</div>
						</td>
					</tr>

				)}
				{error && (
					<tr>
						<td colSpan={endPoint.fields_display.length + 1}>
							<div className="d-flex justify-content-center align-items-center">
								<p>Error</p>
							</div>
						</td>
					</tr>
				)}
			</tbody>
		);
	};

	useEffect(() => {
		if (loading) {
			fetchData();
		}
	}, [loading, fetchData]);

	return (
		<div className="app-table">
			<div className="app-table__table-header d-flex justify-content-between align-items-center pb-2">
				<h4 className="text-capitalize">{""}</h4>
				<div className="d-flex">
					<Button variant="icon" onClick={() => setLoading(true)}>
						<Icon name="redo" size={3} />
					</Button>
					<Button variant="icon">
						<Icon name="plus" size={3} />
					</Button>
				</div>
			</div>
			<div className="app-table__table-content">
				<Table>
					<THead />
					<TBody />
				</Table>
			</div>
			<div className="app-table__footer d-flex justify-content-center pt-2">
				<div className="">
					<Button disabled={loading || !data?.previous} variant="icon" onClick={() => {
						if (data?.previous && !loading) {
							setPage(prevPage => prevPage - 1);
							setLoading(true);
						}
					}}>
						<Icon name="left" size={3} />
					</Button>
					<span>{data?.page_count ? `${page}/${data.page_count}` : '--'}</span>
					<Button disabled={loading || !data?.next} variant="icon" onClick={() => {
						if (data?.next && !loading) {
							setPage(prevPage => prevPage + 1);
							setLoading(true);
						}
					}}>
						<Icon name="right" size={3} />
					</Button>
				</div>
			</div>
		</div>
	);
}
