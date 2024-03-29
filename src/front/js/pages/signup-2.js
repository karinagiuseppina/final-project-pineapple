import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NormalInput } from "../component/normalInput";
import { ButtonType } from "../component/buttonType";
import { NormalInputPassword } from "../component/normalInputPassword";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import avatar1 from "../../img/avatar1.png";
import avatar2 from "../../img/avatar2.png";
import avatar3 from "../../img/avatar3.png";

export const Signup2 = () => {
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
	const avatars = [avatar1, avatar2, avatar3];

	function avatarRandomImage(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		const avatar = array[randomIndex];
		return avatar;
	}

	async function createUser(event) {
		event.preventDefault();

		const res = await fetch(`${process.env.BACKEND_URL}/api/create-user`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: name,
				age: age,
				email: email,
				password: password,
				profileImage: avatarRandomImage(avatars)
			})
		});

		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
		if (response.ok) {
			let data = await response.json();
			actions.setUserSession(data.token, data.user_id);
		}
		actions.updateInitialUser({});
		History.push("/signup-3");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">Hola {name}, lo primero es tu seguridad</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={createUser}>
				<div>
					<NormalInputPassword
						type={passwordShown ? "text" : "password"}
						placeholder="Contraseña"
						value={password}
						set={setPassword}
						required={true}
						click={togglePasswordVisiblity}
						icon={<FontAwesomeIcon icon={faEye} />}
					/>
				</div>
				<div className="row justify-content-center">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Guardar" />
					</div>
				</div>
			</form>
		</div>
	);
};
