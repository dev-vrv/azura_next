"use client";

import { useRef } from "react";
import Form from "react-bootstrap/Form";

export interface IField {
	name: string;
	type: string;
	required: boolean;
	label: string;
	help_text: string;
	value: any;
	options: {
		label: string;
		value: string;
	}[];
	readonly: boolean;
}

const FieldView = ({ field }: { field: IField }) => {
	const inputRef = useRef(null);
	const handleChange = (e: any) => {
		e.target.focus();
	};

	const props = {
		id: field.name,
		name: field.name,
		label: field.label,
		readOnly: field.readonly,
		disabled: field.readonly,
	};

	if (field.type === "boolean") {
		return (
			<Form.Check type="switch" ref={inputRef} onChange={handleChange} defaultChecked={field.value} {...props} />
		);
	} else if (field.type === "select") {
		return (
			<>
				<Form.Label className="text-capitalize text-muted" htmlFor={field.name}>
					{field.label}
				</Form.Label>
				<Form.Select ref={inputRef} onChange={handleChange} {...props}>
					{field.options.map((option, index) => (
						<option key={index} value={option.value}>
							{option.label}
						</option>
					))}
				</Form.Select>
			</>
		);
	} else {
		return (
			<>
				<Form.Label className="text-capitalize text-muted" htmlFor={field.name}>
					{field.label}
				</Form.Label>
				<Form.Control
					type={field.type}
					ref={inputRef}
					onChange={handleChange}
					defaultValue={field.value}
					{...props}
				/>
			</>
		);
	}
};

export default FieldView;