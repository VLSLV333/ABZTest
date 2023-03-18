const validatePhone = (value) => {
	const pattern = new RegExp('^[+]{0,1}380([0-9]{9})$');
	return pattern.test(value);
};

export default validatePhone;
