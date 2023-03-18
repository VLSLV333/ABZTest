import style from './UserCard.module.scss';
import PhotoFallBack from '../../../assets/photoFallBack/PhotoFallBack';

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

const UserCard = ({ email, name, photo, position, phone }) => {

	const [imgLink] = useState(photo);
	const [errorInImage, setErrorInImage] = useState(false);

	const imageErrorHandler = () => {
		setErrorInImage(true);
	};

	return (
		<section className={style.section}>
			{!errorInImage && (
				<img
					src={`${imgLink}`}
					alt='beautiful user'
					onError={imageErrorHandler}
				/>
			)}
			{errorInImage && <PhotoFallBack />}
			<p
				className={style.name}
				data-tooltip-id={name}
				data-tooltip-content={name}
				data-tooltip-place='bottom'
			>
				{name}
			</p>
			<p
				data-tooltip-id={position}
				data-tooltip-content={position}
				data-tooltip-place='bottom'
			>
				{position}
			</p>
			<p
				data-tooltip-id={email}
				data-tooltip-content={email}
				data-tooltip-place='bottom'
			>
				{email}
			</p>
			<p
				data-tooltip-id={phone}
				data-tooltip-content={phone}
				data-tooltip-place='bottom'
			>
				{phone}
			</p>
			<Tooltip id={name} />
			<Tooltip id={position} />
			<Tooltip id={email} />
			<Tooltip id={phone} />
		</section>
	);
};

export default UserCard;
