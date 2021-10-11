import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const Signup4 = () => {
	let History = useHistory();
	const [processtimeslots, setProcesstimeslots] = useState([]);
	const [processtimeslotsid, setProcesstimeslotsid] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/processtimeslots", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			console.log(data);
			setProcesstimeslots(data);
		})();
	}, []);

	const optionHtml = processtimeslots.map(function(processtimeslot) {
		console.log(processtimeslot.id);
		if (processtimeslot.id === 1) {
			return (
				<option key={processtimeslot.id} value={processtimeslot.id}>
					{processtimeslot.min_value} - {processtimeslot.max_value} año
				</option>
			);
		} else if (processtimeslot.id === 2 || processtimeslot.id === 3) {
			return (
				<option key={processtimeslot.id} value={processtimeslot.id}>
					{processtimeslot.min_value} - {processtimeslot.max_value} años
				</option>
			);
		} else if (processtimeslot.id === 4) {
			return (
				<option key={processtimeslot.id} value={processtimeslot.id}>
					mas de {processtimeslot.min_value} años
				</option>
			);
		}
	});

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("userid");
		console.log("processtimeslot id" + processtimeslotsid);
		await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/update-processtimeslot", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				process_id: processtimeslotsid,
				user_id: userId
			})
		});
		History.push("/signup-5");
	}

	return (
		<div className="text-center mt-5">
			<h1>¿Cuanto llevas en busqueda? </h1>
			<form onSubmit={updateInfo}>
				<select name="tiempo_proceso" onChange={event => setProcesstimeslotsid(event.target.value)}>
					{optionHtml}
				</select>
				<input type="submit" value="Siguiente" />
				<Link to={"signup-5"}>
					<button>Saltar</button>{" "}
				</Link>
			</form>
			{/* <progress id="file" max="100" value="20">
				{" "}
				20%{" "}
			</progress> */}
			<ProgressBar now={20} />
		</div>
	);
};
