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
					"https://gist.githubusercontent.com/kiki-do/4afc9b5d8ac50074ae448464a645ffb3/raw/255a1f85b9cbb6e7e8fe321f68fe8e538d3fcbe4/db.json"
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
