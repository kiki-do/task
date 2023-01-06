import { useState } from "react";
import "./App.css";

import { Message } from "./components/Message/Message";

const App = () => {
	const [isActive, setIsActive] = useState(false);

	const activeHandler = () => setIsActive(!isActive);
	return (
		<div>
			<button className="button" onClick={activeHandler}>
				Открыть форму
			</button>
			{isActive && <Message />}
		</div>
	);
};

export default App;
