import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const SignupRelacion = () => {
	return (
		<div className="text-center mt-5">
			<h1>¿Tienes una relacion?</h1>
			<select name="tiempo_proceso">
				<option>No</option>
				<option>Tengo una relacion con una mujer</option>
				<option>Tengo una relacion con una hombre</option>
				<option>Tengo una relacion</option>
			</select>
			<Link to={"/signup-tratamientos"}>Siguiente</Link>
			<button>Saltar pregunta</button>
			{/* <progress id="file" max="100" value="60">
				{" "}
				60%{" "}
			</progress> */}
			<ProgressBar now={60} />
		</div>
	);
};
