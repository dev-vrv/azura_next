"use client";

import { Context } from "@/context/context";
import { Spinner } from "react-bootstrap";
import { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Row, Col, Container } from "react-bootstrap";
import Icon from "@/components/icons/Icon";
import Form from "react-bootstrap/Form";
import FieldView, { IField } from "./AppField";

type TypeEndpoint = { method: string; url: string };

interface PropsAppForm {
	appName: string;
	id: string;
	endpoint: TypeEndpoint;
}

const FormSubmit = (e: React.FormEvent<HTMLFormElement>, endpoint: TypeEndpoint) => {
	e.preventDefault();

	const form = e.currentTarget;
	const formData = new FormData(form);

	const data: { [key: string]: any } = {};
	formData.forEach((value, key) => {
		if (value === "on") {
			data[key] = true;
		} else if (value === "off") {
			data[key] = false;
		} else {
			data[key] = value;
		}
	});
};

const AppForm = ({ appName, id }: PropsAppForm) => {
	const { context } = useContext(Context);
	const [inputsValues, setInputsValues] = useState<{ [key: string]: any }>({});
	const [data, setData] = useState<{ [key: string]: any } | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const router = useRouter();

	const FetchData = useCallback(async () => {
		setError(false);
		const action = context.apps[appName]["retrieve_form"]["action"];
		try {
			const url = `${context.api.url}${appName}/${id}/${action}/`;
			const res = await fetch(url);
			const data = await res.json();
			setData(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [appName, context, id]);

	useEffect(() => {
		loading && FetchData();
	}, [context, FetchData, loading]);

	useEffect(() => {
		if (data) {
			const inputs: { [key: string]: any } = {};
			data.forEach((field: IField) => {
				inputs[field.name] = field.value || undefined;
			});
			setInputsValues(inputs);
		}
	}, [data]);

	const makeGroups = (): { [key: string]: any }[] => {
		const formGroups = context.apps[appName]["form_groups"];
		const groups: any = {};
		if (formGroups && data) {
			formGroups.forEach((group: any) => {
				group.fields.forEach((field: any) => {
					if (!groups[group.name]) {
						groups[group.name] = [];
					}
					data.forEach((dataField: IField) => {
						if (field === dataField.name) {
							groups[group.name].push(dataField);
						}
					});
				});
			});
		}
		return groups;
	};
	const groups = makeGroups();
	return (
		<div className="app-form h-100 d-flex justify-content-center align-items-center">
			{data && (
				<Form
					className="w-100 h-100 d-flex flex-column justify-content-between gap-2"
					onSubmit={(e: any) => FormSubmit(e)}
				>
					<div className="d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<Button variant="icon" onClick={() => router.push(`/admin/${appName}`)}>
								<Icon name="left" size={4}></Icon>
							</Button>
							<h4 className="text-capitalize">{appName}</h4>
						</div>
					</div>
					<Container fluid className="h-100 d-flex flex-wrap gap-2 overflow-y-scroll">
						<Row className="w-100 g-2">
							{Object.keys(groups).map((groupName: any, index: number) => (
								<Col
									xs={6}
									className="d-flex flex-column justify-content-start h-auto gap-2"
									key={index}
								>
									<h5 className="text-capitalize">{groupName.replace("_", " ")}</h5>
									{context.apps[appName]["form_groups"].map((group: any) => {
										if (group.name === groupName) {
											return (
												<p key={group.name} className="text-capitalize text-muted">
													{group.description}
												</p>
											);
										}
									})}
									{groups[groupName].map((field: IField, index: number) => (
										<div className="w-100 py-1 px-1" key={index}>
											<FieldView field={field} />
										</div>
									))}
								</Col>
							))}
						</Row>
					</Container>
					<div className="d-flex justify-content-end gap-2">
						<Button variant="primary" type="submit">
							Save
						</Button>
					</div>
				</Form>
			)}
			{loading && <Spinner animation="grow" />}
			{error && <div>Error</div>}
		</div>
	);
};

export default AppForm;
