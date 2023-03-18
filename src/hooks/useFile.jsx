import { useState } from 'react';

const useFile = () => {
	const [fileText, setFileText] = useState('Upload your photo');
	const [file, setFile] = useState(null);

	const validateFile = () => {
		const fileInput = document.getElementById('file');

		const filePath = fileInput.value;

		let allowedExtensions = /(\.jpg|\.jpeg)$/i;

		setFileText('Item');

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
	return {
		fileText,
		file,
		validateFile,
		setFileText,
		setFile,
	};
};

export default useFile;
