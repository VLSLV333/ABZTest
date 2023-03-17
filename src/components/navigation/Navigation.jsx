import Logo from '../../assets/logo/Logo';
import Button from '../../common/Button/Button';

import style from './Navigation.module.scss';

const Navigation = () => {
	return (
		<nav className={style.nav}>
			<a href='/'>
				<Logo />
			</a>
			<ul className={style.ul}>
				<li>
					<a href='/'>
						<Button txt='Users' />
					</a>
				</li>
				<li  className={style.hero}>
					<a href='/'>
						<Button txt='Sign up' />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
