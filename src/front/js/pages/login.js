import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Log In</h1>
			<label>email</label>
			<input type="email" />
			<label>Contraseña</label>
			<input type="password" />
			<Link to={"list-of-women"}>Log In</Link>
		</div>
	);
};
