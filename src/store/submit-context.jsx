import { createContext } from 'react';

const SubmitContext = createContext({
	buttonClicked: false,
	handleClick: () => {},
});

export default SubmitContext;
