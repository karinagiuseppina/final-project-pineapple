import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const Signup2 = () => {
	const eye = <FontAwesomeIcon icon={faEye} />;
	const History = useHistory();
	const { store, actions } = useContext(Context);
	const name = store.initialUser.name;
	const email = store.initialUser.email;
	const age = store.initialUser.age;
	const [password, setPassword] = useState("");
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	async function createUser(event) {
		event.preventDefault();

		const res = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/create-user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				age: age,
				email: email,
				password: password
			})
		});

		// const responseJson = await response.json();

		// if (responseJson.access_token) {
		// 	localStorage.setItem("access_token", responseJson.access_token);
		// }
		const resJson = await res.json();
		console.log(resJson);
		if (resJson) {
			localStorage.setItem("userid", resJson);
		}

		actions.updateInitialUser({});
		History.push("/signup-3");
	}

	return (
		<div className="text-center mt-5">
			<h1>Hola {name}, lo primero es tu seguridad</h1>
			<form onSubmit={createUser}>
				<label>Contraseña</label>
				<input type={passwordShown ? "text" : "password"} onChange={event => setPassword(event.target.value)} />
				<i onClick={togglePasswordVisiblity}>{eye}</i>
				<input type="submit" value="Siguiente" />
			</form>
		</div>
	);
};
