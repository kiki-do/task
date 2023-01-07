import { useState } from "react";
import "./App.scss";

import { Message } from "./components/Message/Message";

const App = () => {
	const [isActive, setIsActive] = useState(true);

	const activeHandler = () => setIsActive(!isActive);
	return (
		<div>
			<button className="button" onClick={activeHandler}>
				{isActive ? "Закрыть форму" : "Открыть форму"}
			</button>
			{isActive && <Message />}
		</div>
	);
};

export default App;
