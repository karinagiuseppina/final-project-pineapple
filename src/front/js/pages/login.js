import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { NormalInput } from "../component/normalInput";
import { useHistory } from "react-router";
import { ButtonType } from "../component/buttonType";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [userLogin, setUserLogin] = useState({ email: "", password: "" });
	let History = useHistory();

	const getLoginData = (attr, value) => {
		setLoginData(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};

	const badLoginAlert = () => {
		Swal.fire({
			title: "Advertencia",
			text: "El email o password introducidos no son correctos",
			icon: "warning",
			confirmButtonText: "Cerrar"
		});
	};

	const logUserIn = async (email, password) => {
		if (loginData.email === "" || loginData.password === "") {
			badLoginAlert();
			return;
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

		let data = await response.json();
		if (response.ok) {
			actions.setUserSession(data.token, data.user_id);
			History.push("/");
			}
		};

	const handleLogin = () => {
		logUserIn(userLogin.email, userLogin.password);
	};
}

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
