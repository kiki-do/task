import { useState } from "react";
import classes from "./App.module.scss";

import { Home } from "./pages/Home";

const App = () => {
	/*Состояние появления формы */
	const [isActive, setIsActive] = useState(true);

	const activeHandler = () => setIsActive(!isActive);
	return (
		<div className={classes.wrapper}>
			<button className="button" onClick={activeHandler}>
				{isActive ? "Закрыть форму" : "Открыть форму"}
			</button>
			<Home isActive={isActive} />
		</div>
	);
};

export default App;
