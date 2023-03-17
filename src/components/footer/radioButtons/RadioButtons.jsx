import style from './RadioButtons.module.scss';
import { useState, useEffect } from 'react';

const RadioButtons = ({ formInfo }) => {
	const [positions, setPositions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [error, setError] = useState({
		success: true,
		message: '',
	});

	useEffect(() => {
		const getPositions = async () => {
			const response = await fetch(
				'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
			);
			if (response.status === 404) {
				setError({
					success: false,
					message: 'Page not found',
				});
				return;
			}

			if (response.status === 422) {
				setError({
					success: false,
					message: 'Positions not found',
				});
				return;
			}

			if (!response.ok) {
				setError({
					success: false,
					message: 'Positions fetch failed :(',
				});
				return;
			}

			const data = await response.json();
			data.positions[0].checked = true;
			setSelectedOption(data.positions[0].id);
			setPositions(data.positions);
		};
		try {
			getPositions();
		} catch (error) {
			setError({
				success: false,
				message: 'Positions fetch failed :(',
			});
		}
	}, []);

	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};

	formInfo(selectedOption);

	return (
		<div className={style.wholeBlock}>
			{error.success &&
				positions.map(({ id, name, checked }) => (
					<div key={id}>
						<input
							type='radio'
							id={id}
							name='positions'
							value={id}
							onChange={handleOptionChange}
							defaultChecked={checked}
						/>
						<span
							className={style.custom}
							onClick={() => handleOptionChange(id)}
						/>
						<label htmlFor={id}>{name}</label>
					</div>
				))}
			{!error.success && <p className={style.error}>{error.message}</p>}
		</div>
	);
};

export default RadioButtons;
