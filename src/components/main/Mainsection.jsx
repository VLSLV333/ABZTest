import UserCard from './userCard/UserCard';
import Button from '../../common/Button/Button';

import { useEffect, useState } from 'react';

import style from './MainSection.module.scss';

const MainSection = () => {
	const [usersArray, setUsersArray] = useState([]);
	const [nextLinkToFetch, setNextLinkToFetch] = useState('');
	const [errors, setError] = useState({
		success: true,
		message: '',
	});

	useEffect(() => {
		try {
			const getData = async () => {
				const response = await fetch(
					'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
				);

				if (response.status === 404) {
					setError({
						success: false,
						message: 'Page not found',
					});
					return;
				}

				if (response.status === 422) {
					const err = await response.json();
					setError({
						success: false,
						message: err.message,
						fails: err.fails,
					});
					return;
				}

				if (!response.ok) {
					setError({
						success: false,
						message: 'Coudln`t fetch data :(',
					});
					return;
				}

				const users = await response.json();

				setUsersArray(users.users);
				setNextLinkToFetch(users.links.next_url);
			};
			getData();
		} catch (err) {
			setError({
				success: false,
				message: err.message,
			});
		}
	}, []);

	const getNewUsers = async () => {
		const response = await fetch(nextLinkToFetch);

		if (response.status === 404) {
			setError({
				success: false,
				message: 'Page not found',
			});
			return;
		}

		if (response.status === 422) {
			const err = await response.json();
			setError({
				success: false,
				message: err.message,
				fails: err.fails,
			});
			return;
		}

		if (!response.ok) {
			setError({
				success: false,
				message: 'Coudln`t fetch data :(',
			});
			return;
		}

		const newUsers = await response.json();

		setNextLinkToFetch(newUsers.links.next_url);
		setUsersArray((prevState) => {
			return [...prevState, ...newUsers.users];
		});
	};

	const showMoreButtonHandler = () => {
		try {
			getNewUsers();
		} catch (err) {
			setError({
				success: false,
				message: err.message,
			});
		}
	};

	let errorsArray = [];

	if (errors.fails) {
		for (let error in errors.fails) {
			errorsArray.push(...errors.fails[error]);
		}
	}

	return (
		<main className={style.main}>
			<h1>Working with GET request</h1>
			{!errors.success && <p className={style.error}>{errors.message}</p>}
			{errorsArray &&
				!errors.success &&
				errorsArray.map((errMes) => (
					<p key={errMes} className={style.error}>
						{errMes}
					</p>
				))}
			{usersArray.map((user) => (
				<UserCard
					key={user.id}
					email={user.email}
					name={user.name}
					photo={user.photo}
					position={user.position}
					phone={user.phone}
				/>
			))}
			{nextLinkToFetch && (
				<Button txt={'Show more'} onClick={showMoreButtonHandler} />
			)}
		</main>
	);
};

export default MainSection;
