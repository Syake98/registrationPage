import { useState } from 'react';

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
};

export const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getUserInfo: () => state,
		postUserInfo: (fieldName, fieldValue) => {
			setState({ ...state, [fieldName]: fieldValue });
		},
		resetFields: () => setState(initialState),
	};
};
