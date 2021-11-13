import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { NormalInputPassword } from "../component/normalInputPassword";
import { useHistory } from "react-router";
import { ButtonType } from "../component/buttonType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	let History = useHistory();
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const badLogin = {
		title: "Atención",
		text: "El usuario o contraseña ingresados son incorrectos",
		icon: "warning",
		confirmButtonText: "cerrar"
	};

	const getLoginData = (attr, value) => {
		setLoginData(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};

	const logUserIn = async (email, password) => {
		if (email === "" || password === "") {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
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
			History.push("/list-of-women");
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
	};
	const handleLogin = () => {
		logUserIn(loginData.email, loginData.password);
	};

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¡Bienvenida de nuevo!</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>

			<form>
				<NormalInput type="email" placeholder="email" value={loginData.email} set={getLoginData} attr="email" />
				<NormalInputPassword
					type={passwordShown ? "text" : "password"}
					placeholder="Contraseña"
					value={loginData.password}
					set={getLoginData}
					click={togglePasswordVisiblity}
					attr="password"
					icon={<FontAwesomeIcon icon={faEye} />}
				/>
				<div className="row">
					<div className="col-12 col-md-6">
						<ButtonType classN="button primary" type="button" value="Log In" onClick={handleLogin} />
					</div>
					<div className="col-12 col-md-6">
						<Link to={"/signup-1"}>
							<ButtonType classN="button secondary" type="button" value="Registrarse" />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
