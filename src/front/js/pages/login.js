import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { useHistory } from "react-router";
import { ButtonType } from "../component/buttonType";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	let History = useHistory();

	const badLogin = {
		title: "Atención",
		text: "El usuarion o contraseña ingresados son incorrectos",
		icon: "warning",
		confirmButtonText: "cerrar"
	};

	const getLoginData = (attr, value) => {
		console.log("from getLoginData: ", attr, value);
		setLoginData(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};
	console.log("loginData: ", loginData);

	const logUserIn = async (email, password) => {
		console.log("from logUserIn: ", email, password);
		if (loginData.email === "" || loginData.password === "") {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
			return;
		}
		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({
				email: loginData.email,
				password: loginData.password
			})
		});
		if (response.ok) {
			let data = await response.json();
			console.log(data);

			actions.setUserSession(data.token, data.user_id);
			History.push("/");
		} else {
			actions.notificationAlert(badLogin.title, badLogin.text, badLogin.icon, badLogin.confirmButtonText);
		}
	};
	const handleLogin = () => {
		logUserIn(loginData.email, loginData.password);
	};

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white">
					<form>
						<h1>Log In</h1>
						<NormalInput
							type="email"
							placeholder="example@example.com"
							value={loginData.email}
							set={getLoginData}
							attr="email"
							icon="fa fa-envelope"
						/>
						<NormalInput
							type="password"
							placeholder="Contraseña"
							value={loginData.password}
							set={getLoginData}
							attr="password"
							icon="fas fa-key"
						/>

						<div className="row justify-content-center">
							<div className="col text-center">
								<ButtonType type="button" onClick={handleLogin} value="Log In" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
