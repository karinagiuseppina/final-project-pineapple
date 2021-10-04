import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const SignupExplanation = () => {
	return (
		<div className="text-center mt-5">
			<h1>Queremos conocerte mejor</h1>
			<h2>
				Sabemos que es dificil pero para encontrar tu media piña necesitamos toda la informacion que nos puedas
				dar. Todas Las preguntas son opcionales.
			</h2>
			<Link to={"/signup-tiempo"}>
				<button>Siguiente</button>
			</Link>
			<Link to={"/list-of-women"}>
				<button>Saltar Cuestonario</button>{" "}
			</Link>
		</div>
	);
};
