import style from './Footer.module.scss';

import RadioButtons from './radioButtons/RadioButtons';
import Button from '../../common/Button/Button';
import useInput from '../../hooks/useInput';

import { useState } from 'react';

const Footer = () => {
	const [file, setFile] = useState(null);

	const validateEmail = (value) => {
		if (value.length < 2 && value.length > 100) {
			return false;
		}
		const pattern = new RegExp(
			// eslint-disable-next-line no-control-regex
			'^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$'
		);
		return pattern.test(value);
	};

	const validatePhone = (value) => {
		const pattern = new RegExp('^[+]{0,1}380([0-9]{9})$');
		return pattern.test(value);
	};

	const validateFile = () => {
		const fileInput = document.getElementById('file');

		const filePath = fileInput.value;

		let allowedExtensions = /(\.jpg|\.jpeg)$/i;

		if (!allowedExtensions.exec(filePath)) {
			setFile({
				error: true,
				message: 'The photo format must be jpeg/jpg type',
			});
			return;
		} else {
			const file = fileInput.files[0];
			const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
			if (+sizeInMB > 5) {
				setFile({
					error: true,
					message: 'The photo size must not be greater than 5 Mb',
				});
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target.result;

				img.onload = () => {
					if (img.width < 70 || img.height < 70) {
						setFile({
							error: true,
							message: 'The minimum photo size is 70x70px',
						});
						return;
					} else {
						setFile(file);
					}
				};
			};
		}
	};

	const {
		value: nameInputValue,
		isValid: nameInputIsValid,
		hasError: nameInputHasError,
		valueChangeHadler: nameInputChangeHadler,
		inputBlurHadler: nameInputBlurHadler,
		reset: nameInputReset,
	} = useInput((value) => value.length >= 2 && value.length <= 60);

	const {
		value: emailInputValue,
		isValid: emailInputIsValid,
		hasError: emailInputHasError,
		valueChangeHadler: emailInputChangeHadler,
		inputBlurHadler: emailInputBlurHadler,
		reset: emailInputReset,
	} = useInput(validateEmail);

	const {
		value: phoneInputValue,
		isValid: phoneInputIsValid,
		hasError: phoneInputHasError,
		valueChangeHadler: phoneInputChangeHadler,
		inputBlurHadler: phoneInputBlurHadler,
		reset: phoneInputReset,
	} = useInput(validatePhone);

	let radioValue = null;

	const radioButtonHandler = (value) => {
		radioValue = value;
	};

	let formValid = false;

	if (
		nameInputIsValid &&
		emailInputIsValid &&
		phoneInputIsValid &&
		radioValue &&
		file
	) {
		formValid = true;
	}

	const formHandler = (event) => {
		event.preventDefault();
		console.log(radioValue);

		nameInputReset();
		emailInputReset();
		phoneInputReset();
	};

	return (
		<footer className={style.footer}>
			<h1>Working with POST request</h1>
			<form onSubmit={formHandler}>
				<input
					className={`${style.firstTree} ${
						nameInputHasError ? style.errorBorder : ''
					}`}
					placeholder='Your name'
					value={nameInputValue}
					onChange={nameInputChangeHadler}
					onBlur={nameInputBlurHadler}
				/>
				{nameInputHasError && (
					<p className={style.errorText}>
						Username should contain 2-60 characters
					</p>
				)}
				<input
					className={`${style.firstTree} ${
						emailInputHasError ? style.errorBorder : ''
					}`}
					placeholder='Email'
					value={emailInputValue}
					onChange={emailInputChangeHadler}
					onBlur={emailInputBlurHadler}
				/>
				{emailInputHasError && (
					<p className={style.errorText}>User email, must be a valid email</p>
				)}
				<input
					className={`${style.firstTree} ${
						phoneInputHasError ? style.errorBorder : ''
					}`}
					placeholder='Phone'
					value={phoneInputValue}
					onChange={phoneInputChangeHadler}
					onBlur={phoneInputBlurHadler}
				/>
				{phoneInputHasError && (
					<p className={style.errorText}>
						Number should start with code of Ukraine +380
					</p>
				)}
				<p className={style.pSelect}>Select your position</p>
				<RadioButtons formInfo={radioButtonHandler} />
				<label className={style.file}>
					<input type='file' id='file' onChange={validateFile} />
					<span className={style.fileCustom}></span>
				</label>
				{file?.error && <p className={style.errorText}>{file.message}</p>}
				<Button txt={'Sign up'} disabled={!formValid} />
			</form>
		</footer>
	);
};

export default Footer;
