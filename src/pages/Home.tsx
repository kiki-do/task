import clsx from "clsx";
import { useMemo } from "react";
import { FC } from "react";
import { Message } from "../components/Message/Message";
import classes from "./Home.module.scss";

export interface HomeProps {
	isActive: boolean;
}

export interface HomeComponent extends FC<HomeProps> {}

export const Home: HomeComponent = ({ isActive }) => {
	const wrapperClassName = useMemo(
		() =>
			clsx(classes.wrapper, {
				[classes.isActive]: !isActive,
			}),
		[isActive]
	);
	return (
		<div className={wrapperClassName}>
			<Message />
		</div>
	);
};
