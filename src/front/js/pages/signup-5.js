import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { NormalInput } from "../component/normalInput";
import { Context } from "../store/appContext";

export const Signup5 = () => {
	const [numAbortos, SetNumAbortos] = useState("");
	const { store, actions } = useContext(Context);
	let History = useHistory();

	function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");

		fetch(`${process.env.BACKEND_URL}/api/update-abortion`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token },
			body: JSON.stringify({
				abortion_num: numAbortos,
				user_id: userId
			})
		});
		History.push("/signup-6");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Has sufrido alguna perdida?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>

			<form onSubmit={updateInfo}>
				<NormalInput
					type="number"
					placeholder="Número de Pérdidas"
					value={numAbortos}
					set={SetNumAbortos}
					icon="fa fa-user"
					required={false}
				/>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/signup-6"}>
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
		</div>
	);
};
