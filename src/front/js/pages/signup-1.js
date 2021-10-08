import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

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
		<div className="text-center mt-5 Singup-box">
			<h1>¿Nos conocemos?</h1>
			<form onSubmit={saveInfo}>
				<label>Nombre</label>
				<input type="text" placeholder="Nombre" onChange={event => setName(event.target.value)} required />
				<label>Edad</label>
				<input type="number" onChange={event => setAge(event.target.value)} placeholder="age" required />
				<label>email</label>
				<input type="email" onChange={event => setEmail(event.target.value)} placeholder="email" required />
				<input type="submit" value="Siguiente" />
			</form>
		</div>
	);
};
