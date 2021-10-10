import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { NormalInput } from "../component/normalInput";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [userLogin, setUserLogin] = useState({ email: "", password: "" });

	const getLoginData = (attr, value) => {
		let logged_user = { ...userLogin };
		logged_user[attr] = value;
		setUserLogin(logged_user);
	};

	const logUserIn = async (email, password) => {
		const response = await fetch(`${process.env.BACKEND_URL}/login`, {
			method: "PUT",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password
			})
		});
	};

	const handleLogin = () => {
		logUserIn(userLogin.email, userLogin.password);
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
							value={userLogin.email}
							set={getLoginData}
							attr="email"
							icon="fa fa-envelope"
						/>
						<NormalInput
							type="password"
							placeholder="Contraseña"
							value={userLogin.password}
							set={getLoginData}
							attr="password"
							icon="fas fa-key"
						/>

						<div className="row justify-content-center">
							<div className="col text-center">
								<button type="button" className="btn bg-prin" onClick={handleLogin}>
									Log in
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
