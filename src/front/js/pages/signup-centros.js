import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const SignupCentros = () => {
	return (
		<div className="text-center mt-5">
			<h1>¿A que centros has acudido?</h1>
			<form>
				<input type="checkbox" value="Sanida Privada" />
				<label> Sanida Privada</label>
				<br />
				<input type="checkbox" value="Sanidad Publica" />
				<label> Sanidad Publica </label>
				<br />
			</form>
			<Link to={"/list-of-women"}>
				<button>Conoce tu media piña</button>
			</Link>
			{/* <Link to={"/signup-tratamientos"}>Siguiente</Link> */}
			{/* <progress id="file" max="100" value="100">
				{" "}
				100%{" "}
			</progress> */}
			<ProgressBar now={100} />
		</div>
	);
};
