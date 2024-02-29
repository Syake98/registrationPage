import { useRef, useState } from 'react';
import './App.module.css';
import styles from './App.module.css';
import { useStore } from './hooks/useStore';

export const App = () => {
	const { getUserInfo, postUserInfo, resetFields } = useStore();
	const { email, password, repeatPassword } = getUserInfo();
	const [error, setError] = useState(null);
	const submitButtonRef = useRef(null);
	const inputEmailRef = useRef(null);
	const inputPasswordRef = useRef(null);
	const inputRepeatPasswordRef = useRef(null);

	const sendData = (form) => {
		console.log(form);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (
			inputEmailRef.current?.value &&
			inputPasswordRef.current?.value &&
			inputRepeatPasswordRef.current?.value &&
			inputPasswordRef.current?.value === inputRepeatPasswordRef.current?.value &&
			error === null
		) {
			sendData(getUserInfo());
			resetFields();
			return;
		}
		setError('Пароли не совпадают');
	};

	const onChange = (e) => {
		postUserInfo(e.target.name, e.target.value);
		if (
			e.target.name === 'repeatPassword' &&
			inputRepeatPasswordRef.current.value === password
		) {
			submitButtonRef.current.focus();
		}
	};

	const onBlur = (e) => {
		let error = null;
		if (
			e.target.type === 'email' &&
			!/^[\w]*@[a-z]*.[a-z]{2,3}$/.test(e.target.value)
		) {
			error = 'Некорректный email';
		} else if (e.target.type === 'password' && e.target.value.length < 8) {
			error = 'Пароль должен содержать не менее 8 символов';
		} else if (e.target.type === 'password' && !/^[\w_]{8,}$/.test(e.target.value)) {
			error =
				'Некорректный пароль. Разрешены латинские символы, цифры, нижнее подчёркивание';
		}
		setError(error);
	};

	const onReset = () => {
		resetFields();
		setError(null);
	};

	return (
		<div className={styles.form}>
			<form onSubmit={onSubmit}>
				<div className={styles.title}>Регистрация</div>
				{error && <div className={styles.errorMessage}>{error}</div>}
				<input
					className={styles.input}
					ref={inputEmailRef}
					name="email"
					type="email"
					placeholder="Введите email"
					value={email}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<input
					className={styles.input}
					ref={inputPasswordRef}
					name="password"
					type="password"
					placeholder="Введите пароль"
					value={password}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<input
					className={styles.input}
					ref={inputRepeatPasswordRef}
					name="repeatPassword"
					type="password"
					placeholder="Повторите пароль"
					value={repeatPassword}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<button type="button" className={styles.button} onClick={onReset}>
					Сбросить данные
				</button>
				<button type="submit" className={styles.button} ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
