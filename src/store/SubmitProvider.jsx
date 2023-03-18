import { useState } from 'react';
import SubmitContext from './submit-context';

const SubmitProvider = (props) => {
	const [clicked, setClicked] = useState(false);
	const clickHandler = () => {
		setClicked(prevState => !prevState);
	};

	const submitContext = {
		buttonClicked: clicked,
		handleClick: clickHandler,
	};

	return (
		<SubmitContext.Provider value={submitContext}>
			{props.children}
		</SubmitContext.Provider>
	);
};

export default SubmitProvider;
