import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { SelectOptionForm } from "../component/selectOptionForm";
import { ButtonType } from "../component/buttonType";

export const Signup4 = () => {
	let History = useHistory();
	const [processtimeslots, setProcesstimeslots] = useState([]);
	const [processtimeslotsid, setProcesstimeslotsid] = useState(null);
	const [processInHTML, setProcessInHTML] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.BACKEND_URL}/api/processtimeslots`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			setProcesstimeslots(data);
		})();
	}, []);

	useEffect(
		() => {
			setProcessInHTML(
				processtimeslots.map(process => {
					let range =
						process.min_value === process.max_value
							? "> 5 años"
							: `${process.min_value} - ${process.max_value} años`;
					let isChecked = process.id === processtimeslotsid ? true : false;
					return (
						<SelectOptionForm
							colClass="col-6 p-1"
							code={`pr-${process.id}`}
							key={`pr-${process.id}`}
							generalName="process"
							id={process.id}
							set={setProcesstimeslotsid}
							option={range}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[processtimeslots, processtimeslotsid]
	);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-processtimeslot`, {
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
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Cuanto tiempo llevas en tu busqueda?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{processInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Siguiente" />
					</div>
					<div className="col-12 col-md-4">
						<Link to={"/signup-5"}>
							<ButtonType classN="button secondary" type="button" value="Saltar Pregunta" />
						</Link>
					</div>
					<div className="col-12 col-md-4">
						<Link to={"/list-of-women"}>
							<ButtonType classN="button alert" type="button" value="Saltar cuestionario" />
						</Link>
					</div>
				</div>
			</form>

			{/* <ProgressBar now={20} /> */}
		</div>
	);
};
