import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const SignupTratamientos = () => {
	return (
		<div className="text-center mt-5">
			<h1>¿¿Que procesos has seguido??</h1>
			<form>
				<input type="checkbox" value="FIV" />
				<label> FIV</label>
				<br />
				<input type="checkbox" value="ISIC" />
				<label> ISIC </label>
				<br />
				<input type="checkbox" value="Inseminacion Artificial" />
				<label> Inseminacion Artificial</label>
			</form>
			<Link to={"/signup-centros"}>Siguiente</Link>
			<button>Saltar pregunta</button>
			{/* <progress id="file" max="100" value="80">
				{" "}
				80%{" "}
			</progress> */}
			<ProgressBar now={80} />
		</div>
	);
};
