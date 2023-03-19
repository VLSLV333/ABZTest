import style from './Success.module.scss';

import SuccessImage from '../../../assets/successImage/SuccessImage';

import SubmitContext from '../../../store/submit-context';

import { useContext } from 'react';

const Success = () => {
	const context = useContext(SubmitContext);

	return (
		<>
			{context.showModal && (
				<div className={style.modal} onClick={context.handleModal}>
					<h1>User successfully registered</h1>
					<SuccessImage />
				</div>
			)}
		</>
	);
};

export default Success;
