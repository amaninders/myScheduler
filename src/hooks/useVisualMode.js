import { useState } from "react";

export default function useVisualMode(initial) {

	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]); // This line is new!

	const transition = (newMode, replace = false) => {
		if (replace) {
			const change = [...history]
			change.splice(-1,1,newMode)
			setHistory([...change])
			setMode(newMode)
			return
		}
		setHistory([...history, newMode])
		setMode(newMode)
	}

	const back = () => {
		if (history.length > 1) {
			const change = [...history]
			change.pop();
			setHistory([...change])
			setMode(change.slice(-1)[0])
		}		
	}

	return {
		mode,
		transition,
		back
	}
}