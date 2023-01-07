import { useMemo, useState } from "react";
import classes from "./App.module.scss";

import { Message } from "./components/Message/Message";
import clsx from "clsx";
import { Home } from "./pages/Home";

const App = () => {
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
