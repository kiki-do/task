import { useState, useEffect } from "react";
import type { ChangeEvent, FC, SetStateAction, Dispatch } from "react";
import classes from "./Form.module.scss";
import { IData } from "../Message/Message";

export interface formProps {
	items: IData[];
	setItems: Dispatch<SetStateAction<IData[]>>;
}

export interface FormComponent extends FC<formProps> {}

export const Form: FormComponent = ({ items, setItems }) => {
	const [formValid, setFormValid] = useState<boolean>(false);

	const [name, setName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const [phoneDirty, setPhoneDirty] = useState<boolean>(false);
	const [nameDirty, setNameDirty] = useState<boolean>(false);
	const [emailDirty, setEmailDirty] = useState<boolean>(false);
	const [messageDirty, setMessageDirty] = useState<boolean>(false);

	const [phoneError, setPhoneError] = useState<string>(
		"Номер должен быть обязательно заполнен"
	);
	const [nameError, setNameError] = useState<string>(
		"Имя должно быть обязательно заполнено"
	);
	const [emailError, setEmailError] = useState<string>(
		"Почта должна быть обязательно заполнена"
	);
	const [messageError, setMessageError] = useState<string>(
		"Сообщение должно быть обязатлено заполнено"
	);

	useEffect(() => {
		if (phoneError || nameError || emailError || messageError)
			setFormValid(false);
		else setFormValid(true);
	}, [phoneError, nameError, emailError, messageError]);

	const addItem = () => {
		(async () => {
			const rawResponse = await fetch("http://localhost:3001/messages", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: name, email: email, message: message }),
			});
			const content = await rawResponse.json();

			console.log(content);
		})();
	};

	const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
		switch (event.target.name) {
			case "name":
				setNameDirty(true);
				break;

			case "phone":
				setPhoneDirty(true);
				break;

			case "email":
				setEmailDirty(true);
				break;

			case "message":
				setMessageDirty(true);
				break;
		}
	};

	const phoneValidateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value);
		const regPhoneValidate = /^((\+7|7|8)+([0-9]){10})$/;
		if (!regPhoneValidate.test(String(event.target.value).toLowerCase())) {
			setPhoneError("Ошибка при вводе номера телефона");
		} else {
			setPhoneError("");
		}
	};

	const nameValidateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
		const regNameValidate = /^[a-zA-Zа-яёА-ЯЁ]+$/u;
		if (!regNameValidate.test(event.target.value.toLowerCase())) {
			setNameError("Ошибка при вводе имени");
		} else {
			setNameError("");
		}
	};

	const emailValidateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		const regEmailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
		if (!regEmailValidate.test(String(event.target.value).toLowerCase())) {
			setEmailError("Ошибка при вводе имени");
		} else {
			setEmailError("");
		}
	};

	const messageValidateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
		const regMessageValidate = message;
		if (regMessageValidate.length < 0) {
			setMessageError("Ошибка при вводе сообщения");
		} else {
			setMessageError("");
		}
	};

	return (
		<div className={classes.wrapper}>
			<h2 className={classes.title}>Write me back!</h2>
			<form className={classes.form} action="">
				{nameError && nameDirty && (
					<div className={classes.validate}>{nameError}</div>
				)}
				<input
					onBlur={event => blurHandler(event)}
					className={classes.name}
					onChange={event => nameValidateHandler(event)}
					value={name}
					type="text"
					name="name"
					placeholder="Ваше имя"
				/>

				{phoneDirty && phoneError && (
					<div className={classes.validate}>{phoneError}</div>
				)}
				<input
					onBlur={event => blurHandler(event)}
					className={classes.phone}
					type="tel"
					value={phone}
					name="phone"
					onChange={event => phoneValidateHandler(event)}
					placeholder="+7 (999) 999-99-99"
				/>

				{emailError && emailDirty && (
					<div className={classes.validate}>{emailError}</div>
				)}
				<input
					onBlur={event => blurHandler(event)}
					className={classes.email}
					value={email}
					onChange={event => emailValidateHandler(event)}
					type="text"
					name="email"
					placeholder="Ваша почта"
				/>

				{messageError && messageDirty && (
					<div className={classes.validate}>{messageError}</div>
				)}

				<input
					onBlur={event => blurHandler(event)}
					className={classes.message}
					onChange={event => messageValidateHandler(event)}
					value={message}
					placeholder="Ваше сообщение"
					name="message"
				/>
				<button
					className={classes.button}
					onClick={addItem}
					type="submit"
					disabled={!formValid}
				>
					Отправить
				</button>
			</form>
		</div>
	);
};
