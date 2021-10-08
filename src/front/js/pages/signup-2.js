import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

export const Signup2 = () => {
	let History = useHistory();
	const { store, actions } = useContext(Context);
	const name = store.initialUser.name;
	const email = store.initialUser.email;
	const age = store.initialUser.age;
	const [password, setPassword] = useState("");

	async function createUser(event) {
		event.preventDefault();

		const response = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/create-user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				age: age,
				email: email,
				password: password
			})
		});

		const responseJson = await response.json();

		if (responseJson.access_token) {
			localStorage.setItem("access_token", responseJson.access_token);
		}

		actions.updateInitialUser({});
		History.push("/signup-3");
	}

	return (
		<div className="text-center mt-5">
			<h1>Hola {name}, lo primero es tu seguridad</h1>
			<form onSubmit={createUser}>
				<label>Contraseña</label>
				<input type="password" onChange={event => setPassword(event.target.value)} />
				<input type="submit" value="Siguiente" />
			</form>
		</div>
	);
};
