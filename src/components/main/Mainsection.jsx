import UserCard from './userCard/UserCard';
import Button from '../../common/Button/Button';

import SubmitContext from '../../store/submit-context';
import ClipLoader from 'react-spinners/ClipLoader';

import { useEffect, useState, useContext, useCallback } from 'react';

import style from './MainSection.module.scss';

let firstRender = true;

const MainSection = () => {
	const [isLoading, setIsLoading] = useState(true);
	const context = useContext(SubmitContext);
	const [usersArray, setUsersArray] = useState([]);
	const [nextLinkToFetch, setNextLinkToFetch] = useState('');
	const [errors, setError] = useState({
		success: true,
		message: '',
	});

	const getNewUsers = useCallback(async (link, update = null) => {
		setIsLoading(true);
		const response = await fetch(link);

		if (response.status === 404) {
			setError({
				success: false,
				message: 'Page not found',
			});
			setNextLinkToFetch(null);
			setIsLoading(false);
			return;
		}

		if (response.status === 422) {
			const err = await response.json();
			setError({
				success: false,
				message: err.message,
				fails: err.fails,
			});
			setIsLoading(false);
			return;
		}

		if (!response.ok) {
			setError({
				success: false,
				message: 'Coudln`t fetch data :(',
			});
			setIsLoading(false);
			return;
		}

		const users = await response.json();

		update
			? setUsersArray(users.users)
			: setUsersArray((prevState) => {
					return [...prevState, ...users.users];
			  });
		setIsLoading(false);
		setNextLinkToFetch(users.links.next_url);
	}, []);

	useEffect(() => {
		if (firstRender) {
			try {
				firstRender = false;
				getNewUsers(
					'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
				);
			} catch (err) {
				setError({
					success: false,
					message: err.message,
				});
				setIsLoading(false);
			}
		}
	}, [getNewUsers]);

	useEffect(() => {
		if (context.buttonClicked) {
			try {
				getNewUsers(
					'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6',
					true
				);
				context.handleClick();
			} catch (err) {
				setError({
					success: false,
					message: err.message,
				});
				setIsLoading(false);
			}
		}
	}, [context.buttonClicked, getNewUsers, context]);

	const showMoreButtonHandler = () => {
		try {
			getNewUsers(nextLinkToFetch);
		} catch (err) {
			setError({
				success: false,
				message: err.message,
			});
			setIsLoading(false);
		}
	};

	let errorsArray = [];

	if (errors.fails) {
		for (let error in errors.fails) {
			errorsArray.push(...errors.fails[error]);
		}
	}

	return (
		<>
			<main className={style.main} id='users'>
				<h1>Working with GET request</h1>
				<div className={style.loader}>
					<ClipLoader color={'#00bdd3'} size={70} loading={isLoading} />
				</div>
				{!errors.success && <p className={style.error}>{errors.message}</p>}
				{errorsArray &&
					!errors.success &&
					errorsArray.map((errMes) => (
						<p key={errMes} className={style.error}>
							{errMes}
						</p>
					))}
				<div className={style.userCards}>
					{usersArray?.map((user) => (
						<UserCard
							key={user.id}
							email={user.email}
							name={user.name}
							photo={user.photo}
							position={user.position}
							phone={user.phone}
						/>
					))}
				</div>
				{nextLinkToFetch && (
					<Button txt={'Show more'} onClick={showMoreButtonHandler} />
				)}
			</main>
		</>
	);
};

export default MainSection;
