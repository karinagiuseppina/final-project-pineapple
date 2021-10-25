import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

import { SelectOptionForm } from "../component/selectOptionForm";
import { ButtonType } from "../component/buttonType";
import { Context } from "../store/appContext";

export const Signup4 = () => {
	const { actions } = useContext(Context);
	let History = useHistory();
	const [processtimeslots, setProcesstimeslots] = useState([]);
	const [processtimeslotsid, setProcesstimeslotsid] = useState(null);
	const [processInHTML, setProcessInHTML] = useState([]);

	useEffect(() => {
		actions.getElements("processtimeslots", setProcesstimeslots);
	}, []);

	useEffect(() => {
		setProcessInHTML(
			processtimeslots.map(process => {
				let range =
					process.min_value === process.max_value
						? "> 5 años"
						: `${process.min_value} - ${process.max_value} años`;
				let isChecked = process.id === processtimeslotsid ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-6 p-1"
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
	}, [processtimeslots, processtimeslotsid]);

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
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
					<h1 className="question-text">¿Cuánto llevas en busqueda? </h1>
					<form onSubmit={updateInfo}>
						<div className="row p-4">{processInHTML}</div>
						<Link to={"/signup-5"}>
							<ButtonType type="button" value="Saltar Cuestionario" />
						</Link>

						<ButtonType type="submit" value="Siguiente" />
					</form>
				</div>
			</div>
		</div>
	);
};
