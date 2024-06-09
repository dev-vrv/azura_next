'use client';

import { Spinner } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { Context } from '@/context/context';
import { useRouter, useParams } from 'next/navigation';
import AppForm from '@/components/admin/form/AppForm';
import { useAdminApi } from '@/api/api_admin';

export default function PageModelForm() {
	const [appExists, setAppExists] = useState<boolean | null>(null);
	const { context } = useContext(Context);
	const router = useRouter();
	const params = useParams();
	const appName = params.model as string
	const id = params.id as string
	const formEndPoint = useAdminApi(appName, 'update');



	useEffect(() => {
		if (context.apps && Object.keys(context.apps).length > 0 && context.apps[appName]) {
			setAppExists(true)
		}
		else if (context.apps && Object.keys(context.apps).length > 0 && !context.apps[appName]) {
			setAppExists(false)
		}
	}, [appName, context, setAppExists]);



	const Content = () => {
		if (appExists === null) {
			return (
				<div className="h-100 w-100 d-flex justify-content-center align-items-center">
					<Spinner animation="grow" />
				</div>
			);
		}
		else if (appExists === true) {
			return <AppForm appName={appName} id={id} endpoint={formEndPoint}></AppForm>
		}
		else {
			router.push('/404');
		}
	}
	return (
		<main className="main">
			<section className="section d-flex flex-column justify-content-between">
				<Content />
			</section>
		</main>
	);
}
