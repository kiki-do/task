import type { FC } from "react";
import classes from "./MessageList.module.scss";

export interface MessageListProps {
	message: string;
	name: string;
	email: string;
}

export interface MessageListComponent extends FC<MessageListProps> {}

export const MessageList: MessageListComponent = ({ email, name, message }) => {
	return (
		<ul className={classes.wrapper}>
			<li className={classes.name}>Имя: {name}</li>
			<li className={classes.email}>Почта: {email}</li>
			<li className={classes.message}>Сообщение: {message}</li>
		</ul>
	);
};
