import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Signup1 = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>¿Nos conocemos?</h1>
			<label>Nombre</label>
			<input type="text" />
			<label>Edad</label>
			<input type="number" />
			<label>email</label>
			<input type="email" />
			<Link to={"/signup-2"}>Siguiente</Link>
		</div>
	);
};
