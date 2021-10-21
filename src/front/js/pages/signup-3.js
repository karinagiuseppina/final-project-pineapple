import React from "react";
import { Link } from "react-router-dom";
import { ButtonType } from "../component/buttonType";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";

export const Signup3 = () => {
	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text"> ¡Queremos conocerte mejor!</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<h6 className="p-3">
				Sabemos que es dificil pero para encontrar tu media piña necesitamos toda la informacion que nos puedas
				dar. Recuerda que puedes omitir la pregunta.
			</h6>
			<div className="row">
				<div className="col-12 col-md-6">
					<Link to={"/signup-4"}>
						<ButtonType classN="button primary" type="button" value="Continuar" />
					</Link>
				</div>
				<div className="col-12 col-md-6">
					<Link to={"/list-of-women"}>
						<ButtonType classN="button alert" type="submit" value="Más tarde" />
					</Link>
				</div>
			</div>
		</div>
	);
};
