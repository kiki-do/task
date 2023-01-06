import { FC, useEffect, useState } from "react";
import { Form } from "../Form/Form";
import { MessageList } from "../MessageList/MessageList";
import classes from "./Message.module.scss";

export interface IData {
	name: string;
	id: number;
	message: string;
	email: string;
}

export const Message: FC = () => {
	const [items, setItems] = useState<IData[]>([]);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const responce = await fetch(
					"https://github.com/kiki-do/task/blob/master/public/db.json"
				);
				const data = await responce.json();
				setItems(data);
			} catch (err) {
				console.log("error");
			}
		};

		fetchItems();
	}, []);
	return (
		<div className={classes.wrapper}>
			<Form items={items} setItems={setItems} />
			<div className={classes.messages}>
				<h2>Данные успешного сообщения</h2>
				{items.map((item: IData) => (
					<ul key={item.id}>
						<MessageList
							name={item.name}
							message={item.message}
							email={item.email}
						/>
					</ul>
				))}
			</div>
		</div>
	);
};
