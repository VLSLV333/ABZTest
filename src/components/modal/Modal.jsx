import WhiteBlur from './whiteBlur/WhiteBlur';
import Success from './success/Success';

import ReactDOM from 'react-dom';

const Modal = () => {
	let details = navigator.userAgent;
	let regexp = /android|iphone|kindle|ipad/i;
	let isMobileDevice = regexp.test(details);

	return (
		<>
			{!isMobileDevice && ReactDOM.createPortal(<Success />, document.getElementById('success'))}
			{!isMobileDevice && ReactDOM.createPortal(<WhiteBlur />, document.getElementById('blur'))}
		</>
	);
};

export default Modal;
