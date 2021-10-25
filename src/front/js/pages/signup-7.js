import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { SelectOptionForm } from "../component/selectOptionForm";
import { Context } from "../store/appContext";

export const Signup7 = () => {
	let History = useHistory();
	const [treatments, setTreatments] = useState([]);
	const [treatmentid, setTreatmentid] = useState("");
	const [treatmentsInHTML, setTreatmentsInHTML] = useState([]);
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getElements("treatments", setTreatments);
	}, []);
	useEffect(() => {
		setTreatmentsInHTML(
			treatments.map(treatment => {
				let isChecked = treatment.id === treatmentid ? true : false;
				return (
					<SelectOptionForm
						colClass={treatment.id == 3 ? "col-12 p-1" : "col-6 p-1"}
						code={`t-${treatment.id}`}
						key={`t-${treatment.id}`}
						generalName="treatment"
						id={treatment.id}
						set={setTreatmentid}
						option={treatment.type}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [treatments, treatmentid]);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-treatment`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token },
			body: JSON.stringify({
				treatment_id: treatmentid,
				user_id: userId
			})
		});
		History.push("/signup-8");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Que tratamiento estas siguiendo?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{treatmentsInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/signup-8"}>
							<ButtonType classN="button secondary" type="button" value="Omitir" />
						</Link>
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/list-of-women"}>
							<ButtonType classN="button alert" type="button" value="Terminar" />
						</Link>
					</div>
				</div>
			</form>

			{/* <ProgressBar now={20} /> */}
		</div>
	);
};
