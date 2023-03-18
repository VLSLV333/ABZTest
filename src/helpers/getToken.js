const getToken = async () => {
	const response = await fetch(
		'https://frontend-test-assignment-api.abz.agency/api/v1/token'
	);

	if (!response.ok) {
		console.log('error handle logic');
	}

	const data = await response.json();
	return data.token;
};

export default getToken;
