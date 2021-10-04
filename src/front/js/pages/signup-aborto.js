import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { SignupRelacion } from "./signup-relacion";

export const SignupAborto = () => {
	return (
		<div className="text-center mt-5">
			<h1>¿Has sufrido alguna perdida?</h1>
			<label>numero</label>
			<input type="number" />

			<Link to={"/signup-relacion"}>
				<button>Siguiente</button>
			</Link>
			<Link to={"/list-of-women"}>
				<button>Saltar Cuestonario</button>{" "}
			</Link>

			{/* <progress id="file" max="100" value="40">
				{" "}
				40%{" "}
			</progress> */}
			<ProgressBar now={40} />
		</div>
	);
};
