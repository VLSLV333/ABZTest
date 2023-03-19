import Logo from '../../assets/logo/Logo';
import Button from '../../common/Button/Button';

import style from './Navigation.module.scss';

const Navigation = () => {
	return (
		<nav className={style.nav}>
			<a href='/' aria-label='Site logo which reloads site on click' >
				<Logo />
			</a>
			<ul className={style.ul}>
				<li>
					<a href='#users'>
						<Button txt='Users' />
					</a>
				</li>
				<li className={style.hero}>
					<a href='#signUp'>
						<Button txt='Sign up' />
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
