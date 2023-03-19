import { createContext } from 'react';

const SubmitContext = createContext({
	buttonClicked: false,
	showModal: false,
	handleClick: () => {},
	handleModal: () => {},
});

export default SubmitContext;
