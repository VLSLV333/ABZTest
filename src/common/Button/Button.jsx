import style from './Button.module.scss';

const Button = ({ txt, disabled, onClick }) => {
	return (
		<button disabled={disabled} className={style.btn} onClick={onClick}>
			{txt}
		</button>
	);
};

export default Button;
