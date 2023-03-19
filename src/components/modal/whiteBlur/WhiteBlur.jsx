import style from './WhiteBlur.module.scss';
import SubmitContext from '../../../store/submit-context';

import { useContext } from 'react';

const WhiteBlur = () => {
	const context = useContext(SubmitContext);
	return context.showModal && <div className={style.white} onClick={context.handleModal}/>;
};

export default WhiteBlur;
