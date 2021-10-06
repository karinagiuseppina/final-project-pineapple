import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Signup2 = () => {
	return (
		<div className="text-center mt-5">
			<h1>Hola Nombre, lo primero es tu seguridad</h1>
			<label>Contraseña</label>
			<input type="password" />

			<Link to={"/signup-3"}>Siguiente</Link>
		</div>
	);
};
