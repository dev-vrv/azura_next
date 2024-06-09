import React from "react";
import { RiInfinityLine } from "react-icons/ri";
import {
    CiAt,
	CiDark,
	CiLight,
	CiFilter,
	CiMonitor,
	CiUser,
	CiWavePulse1,
	CiLogout,
	CiLogin,
	CiBellOn,
	CiCircleInfo,
	CiMail,
	CiSettings,
	CiUndo,
	CiTrash,
	CiShare2,
	CiImport,
	CiLink,
	CiRedo,
	CiCirclePlus,
	CiSquareChevRight,
	CiSquareChevLeft,
	CiCircleAlert,
	CiCircleCheck,
	CiCircleRemove,
	CiCircleChevDown,
	CiCircleChevUp  
} from "react-icons/ci";



const ITheme = {
	dark: CiDark,
	light: CiLight
};

const IElse = {
	at: CiAt,
	
};


const IUI = {
	filter: CiFilter,
	logout: CiLogout,
	login: CiLogin,
	bell: CiBellOn,
	info: CiCircleInfo,
	settings: CiSettings,
	undo: CiUndo,
	redo: CiRedo,
	this: CiTrash,
	share: CiShare2,
	import: CiImport,
	link: CiLink,
	plus: CiCirclePlus,
	down: CiCircleChevDown,
	up: CiCircleChevUp,
	left: CiSquareChevLeft,
	right: CiSquareChevRight,
	alert: CiCircleAlert,
	check: CiCircleCheck, 
	notCheck: CiCircleRemove
};

const Apps = {
	logo: RiInfinityLine,
	monitor: CiMonitor,
	users: CiUser,
	stats: CiWavePulse1,
	mails: CiMail
}

export const IBundle = {
	...ITheme, ...IUI, ...Apps, ...IElse,
};

type TVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type TSize = 6 | 5 | 4 | 3 | 2 | 1;

export interface PropsIcon {
	name: string;
	inline?: boolean;
	size?: TSize;
	variant?: TVariant;
	className?: string;
}

export default function Icon({ variant, size, inline, name, className }: PropsIcon) {
	const classNames = `i ${variant ? `text-${variant}` : ""} ${size ? `fs-${size}` : ""} ${inline ? "d-inline" : ""}`;
	let SvgIcon;
	if (Object.keys(IBundle).includes(name)) {
		SvgIcon = IBundle[name as keyof typeof IBundle];
	}
	else {
		SvgIcon = IBundle['at'];
	}
	return (
        <i className={`${classNames} ${className && className}`}>
			<SvgIcon />
		</i>
    );
}
