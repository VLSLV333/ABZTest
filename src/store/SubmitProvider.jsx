import { useState } from 'react';
import SubmitContext from './submit-context';

const SubmitProvider = (props) => {
	const [clicked, setClicked] = useState(false);
	const [modal, setModal] = useState(false);

	const clickHandler = () => {
		setClicked((prevState) => !prevState);
	};

	const modalHandler = () => {
		setModal((prevState) => !prevState);
	};

	const submitContext = {
		buttonClicked: clicked,
		showModal: modal,
		handleClick: clickHandler,
		handleModal: modalHandler,
	};

	return (
		<SubmitContext.Provider value={submitContext}>
			{props.children}
		</SubmitContext.Provider>
	);
};

export default SubmitProvider;
