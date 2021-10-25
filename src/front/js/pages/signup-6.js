import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { SelectOptionForm } from "../component/selectOptionForm";
import { ButtonType } from "../component/buttonType";
import { Context } from "../store/appContext";

export const Signup6 = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const [coupleOPtions, setCoupleOPtions] = useState([]);
	const [coupleid, setCoupleid] = useState("");
	const [couplesInHTML, setCouplesInHTML] = useState([]);

	useEffect(() => {
		actions.getElements("couples", setCoupleOPtions);
	}, []);

	useEffect(() => {
		setCouplesInHTML(
			coupleOPtions.map(couple => {
				let isChecked = couple.id === coupleid ? true : false;
				return (
					<SelectOptionForm
						colClass="col-6 p-1"
						code={`c-${couple.id}`}
						key={`c-${couple.id}`}
						generalName="couple"
						id={couple.id}
						set={setCoupleid}
						option={couple.option}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [coupleOPtions, coupleid]);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-couple`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token },
			body: JSON.stringify({
				couple_id: coupleid,
				user_id: userId
			})
		});
		history.push("/signup-7");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Tienes una relacion?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{couplesInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/signup-7"}>
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
