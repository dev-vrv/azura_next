'use client';

import { Spinner } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import { Context } from '@/context/context';
import { useParams } from 'next/navigation';
import AppTable from '@/components/admin/table/AppTable';
import { ITableEndpoint } from '@/components/admin/table/AppTable';


export default function PageModelList() {
	const [appExists, setAppExists] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [endPoint, setEndPoint] = useState<ITableEndpoint | null>(null);
	const { context } = useContext(Context);
	const appName = useParams().model as string;

	useEffect(() => {
		if (context.apps?.length) {
			context.apps.find((app) => app === appName) ? setAppExists(true) : setAppExists(false);
		}
	}, [context, appName]);

	useEffect(() => {
		if (appExists) {
			setEndPoint(context.endpoints[appName][context.actions['list']]);
			setLoading(false);
		}
	}, [appExists, context, appName]);
	return (
		<main className="main">
			<section className="section d-flex flex-column justify-content-between">
				{!loading && !error && appExists && endPoint && (
					<AppTable appName={appName} endPoint={endPoint} />
				)}
				{loading && (
					<div className='h-100 w-100 d-flex justify-content-center align-items-center'>
						<Spinner animation="grow" role="status" />
					</div>
				)}
				{error && (
					<div className='h-100 w-100 d-flex justify-content-center align-items-center'>
						<p>Error</p>
					</div>
				)}
			</section>
		</main>
	);
}
