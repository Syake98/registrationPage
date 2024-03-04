import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './App.module.css';
import { useRef } from 'react';

export const App = () => {
	const submitButtonRef = useRef(null);
	const fieldScheme = yup.object().shape({
		email: yup
			.string()
			.required('Данное поле необходимо заполнить!')
			.matches(/^[\w]*@[a-z]*.[a-z]{2,3}$/, 'Некорректный email'),
		password: yup
			.string()
			.required('Данное поле необходимо заполнить!')
			.matches(
				/^[\w_]*$/,
				'Некорректный пароль. Разрешены латинские символы, цифры, нижнее подчёркивание',
			)
			.min(8, 'Пароль должен содержать не менее 8 символов'),
		repeatPassword: yup
			.string()
			.required('Данное поле необходимо заполнить!')
			.test(
				'match',
				'Пароли не совпадает',
				(value) => value === getValues('password'),
			),
	});
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		getValues,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldScheme),
		mode: 'onTouched',
	});

	const errorsFromFields = {
		email: errors.email?.message,
		password: errors.password?.message,
		repeatPassword: errors.repeatPassword?.message,
	};

	const onSubmit = (formData) => {
		console.log('formData', formData);
		reset();
	};

	const setFocusOnButton = {
		onChange: (e) => {
			if (e.target.value === getValues('password')) {
				console.log(submitButtonRef.current)
				return submitButtonRef.current.focus();
			}
		},
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.title}>Регистрация</div>
			<input
				className={styles.input}
				type="email"
				placeholder="Введите email"
				{...register('email')}
			/>
			{errorsFromFields.email && (
				<div className={styles.errorMessage}>{errorsFromFields.email}</div>
			)}
			<input
				className={styles.input}
				type="password"
				placeholder="Введите password"
				{...register('password')}
			/>
			{errorsFromFields.password && (
				<div className={styles.errorMessage}>{errorsFromFields.password}</div>
			)}
			<input
				className={styles.input}
				type="password"
				placeholder="Повторите пароль"
				{...register('repeatPassword', setFocusOnButton)}
			/>
			{errorsFromFields.repeatPassword && (
				<div className={styles.errorMessage}>
					{errorsFromFields.repeatPassword}
				</div>
			)}
			<button type="button" className={styles.button} onClick={() => reset()}>
				Сбросить данные
			</button>

			<button
				ref={submitButtonRef}
				type="submit"
				className={styles.button}
			>
				Зарегистрироваться
			</button>
		</form>
	);
};
