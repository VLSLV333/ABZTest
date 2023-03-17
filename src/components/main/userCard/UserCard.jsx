import style from './UserCard.module.scss';

const UserCard = ({ email, name, photo, position, phone }) => {
	return (
		<section className={style.section}>
			<img src={`${photo}`} alt='beautiful user'/>
			<p className={style.name}>{name}</p>
			<p>{position}</p>
			<p>{email}</p>
			<p>{phone}</p>
		</section>
	);
};

export default UserCard;
