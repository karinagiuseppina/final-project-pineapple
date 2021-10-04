import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const SignupTiempo = () => {
	return (
		<div className="text-center mt-5">
			<h1>¿Cuanto llevas en busqueda?</h1>
			<select name="tiempo_proceso">
				<option>0 - 1 año</option>
				<option>1 - 2 años</option>
				<option>2 - 5 años</option>
				<option>Mas de 5 años</option>
			</select>
			<Link to={"/signup-aborto"}>
				<button>Siguiente</button>
			</Link>
			<Link to={"/list-of-women"}>
				<button>Saltar Cuestonario</button>{" "}
			</Link>
			{/* <progress id="file" max="100" value="20">
				{" "}
				20%{" "}
			</progress> */}
			<ProgressBar now={20} />
		</div>
	);
};
