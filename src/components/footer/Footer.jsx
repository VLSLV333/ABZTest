import style from './Footer.module.scss';

import { useState, useContext } from 'react';

import Button from '../../common/Button/Button';
import RadioButtons from './radioButtons/RadioButtons';

import ClipLoader from 'react-spinners/ClipLoader';

import SubmitContext from '../../store/submit-context';

import useInput from '../../hooks/useInput';
import useFile from '../../hooks/useFile';

import getToken from '../../helpers/getToken';
import validateEmail from '../../helpers/validateEmail';
import validatePhone from '../../helpers/validatePhone';

const Footer = () => {
	const [formIsSubmiting, setIsLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
		success: true,
		message: '',
	});
	const { fileText, file, validateFile, setFileText, setFile } = useFile();
	const [radioInput, setRadioInput] = useState(null);
	const context = useContext(SubmitContext);

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

	const radioButtonHandler = (value) => {
		setRadioInput(value);
	};

	let formValid = false;

	if (
		nameInputIsValid &&
		emailInputIsValid &&
		phoneInputIsValid &&
		radioInput &&
		file &&
		!file.error
	) {
		formValid = true;
	}

	const formHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const token = await getToken();

		const formData = new FormData();
		formData.append('position_id', +radioInput);
		formData.append('name', nameInputValue);
		formData.append('email', emailInputValue);
		formData.append('phone', phoneInputValue);
		formData.append('photo', file);

		const response = await fetch(
			'https://frontend-test-assignment-api.abz.agency/api/v1/users',
			{ method: 'POST', body: formData, headers: { Token: token } }
		);

		if (response.status === 401 || response.status === 409) {
			const err = await response.json();
			setFormErrors({
				success: err.success,
				message: err.message,
			});
			setIsLoading(false);
			return;
		}

		if (response.status === 422) {
			const err = await response.json();
			setFormErrors({
				success: false,
				message: err.message,
				fails: err.fails,
			});
			setIsLoading(false);
			return;
		}

		context.handleModal();
		context.handleClick();
		nameInputReset();
		emailInputReset();
		phoneInputReset();
		setFileText('Upload your photo');
		setFile(null);
		setFormErrors({
			success: true,
			message: '',
		});
		setIsLoading(false);
	};

	let formErrorsArray = [];

	if (formErrors.fails) {
		for (let error in formErrors.fails) {
			formErrorsArray.push(...formErrors.fails[error]);
		}
	}

	return (
		<footer className={style.footer}>
			<h1>Working with POST request</h1>
			<form onSubmit={formHandler}>
				<input
					className={`${style.first3Input} ${
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
					className={`${style.first3Input} ${
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
					className={`${style.first3Input} ${
						phoneInputHasError ? style.errorBorder : ''
					}`}
					placeholder='Phone'
					value={phoneInputValue}
					onChange={phoneInputChangeHadler}
					onBlur={phoneInputBlurHadler}
				/>
				{phoneInputHasError && (
					<p className={style.errorTextHero}>
						Number should start with code of Ukraine +380
					</p>
				)}
				<p className={style.pSelect}>Select your position</p>
				<RadioButtons formInfo={radioButtonHandler} />
				<label className={style.file}>
					<input type='file' id='file' onChange={validateFile} />
					<span
						className={`${style.fileCustom} ${
							file?.error ? style.errorFile : file ? style.changeText : ''
						}`}
						style={{
							'--before-content': `"${fileText}"`,
						}}
					></span>
				</label>
				{file?.error && <p className={style.errorText}>{file.message}</p>}
				{!formErrors.success && (
					<p className={style.formError}>{formErrors.message}</p>
				)}
				{formErrorsArray &&
					!formErrors.success &&
					formErrorsArray.map((errMes) => (
						<p key={errMes} className={style.formError}>
							{errMes}
						</p>
					))}
				{!formIsSubmiting && <Button txt={'Sign up'} disabled={!formValid} />}
			</form>
			<div className={style.loader}>
				<ClipLoader color={'#00bdd3'} size={70} loading={formIsSubmiting} />
			</div>
		</footer>
	);
};

export default Footer;
