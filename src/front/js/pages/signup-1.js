import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";

export const Signup1 = () => {
	let History = useHistory();
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState({});

	function saveInfo(event) {
		event.preventDefault();
		setUser(((user.name = name), (user.age = age), (user.email = email)));
		console.log(user);
		actions.updateInitialUser(user);
		History.push("/signup-2");
	}

	return (
		<div className="text-center mt-5 singup-box">
			<div className="signup-header">
				<h1 className="question-text">¿Nos conocemos?</h1>
				<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
			</div>

			<form onSubmit={saveInfo}>
				<label>Nombre</label>
				<input type="text" placeholder="Nombre" onChange={event => setName(event.target.value)} required />
				<label>Edad</label>
				<input type="number" onChange={event => setAge(event.target.value)} placeholder="age" required />
				<label>email</label>
				<input type="email" onChange={event => setEmail(event.target.value)} placeholder="email" required />
				<input className="button-primary" type="submit" value="Siguiente" />
			</form>
		</div>
	);
};
