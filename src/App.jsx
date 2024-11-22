import React, { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
	const [count, setCount] = React.useState(0);
	const [name, setName] = React.useState();
	const [showTime, setShowTime] = React.useState("0:0:0");

	const handleClick = (e) => {
		console.log(`${e.target.textContent} Button is Clicked!!!`);
		const clickedItemName = e.target.textContent;
		if (name === clickedItemName) {
			setName(name);
		} else {
			setName(clickedItemName);
			setCount(0);
		}
	};
	const incCount = () => {
		setCount(count + 1);
	};

	const [elapsedTime, setElapsedTime] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
  const today = new Date();

  // Format date with custom options
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
	const formatTime = (timeInSeconds) => {
		const hours = Math.floor(timeInSeconds / 3600);
		const minutes = Math.floor((timeInSeconds % 3600) / 60);
		const seconds = timeInSeconds % 60;
		return `${hours}:${minutes}:${seconds}`;
	};

	const startTimer = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}

		const newIntervalId = setInterval(() => {
			setElapsedTime((prevTime) => prevTime + 1);
		}, 1000);

		setIntervalId(newIntervalId);
	};

	useEffect(() => {
		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [intervalId]);
	return (
		<>
			<div className="center-count">
				<h1 className="title-style">Coding Problems Count - {formattedDate}</h1>
				<button>{formatTime(elapsedTime)}</button>
				<small className="startTimer" onClick={startTimer}>
					Start
				</small>

				<hr />
				<hr />
				<hr />
				<div className="flex-container" onClick={handleClick}>
					<button
						className={name === "Codeforces" ? "add-color-to-active-state" : ""}
					>
						Codeforces
					</button>
					<button
						className={name === "CodeChef" ? "add-color-to-active-state" : ""}
					>
						CodeChef
					</button>
					<button
						className={name === "Leetcode" ? "add-color-to-active-state" : ""}
					>
						Leetcode
					</button>
				</div>
				<div>
					<big onClick={incCount}>
					
						{name} : {count}
					</big>
				</div>
			</div>
		</>
	);
};
