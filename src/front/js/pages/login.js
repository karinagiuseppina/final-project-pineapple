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
		setUserLogin(prev => {
			let logged_user = { ...prev };
			logged_user[attr] = value;

			return logged_user;
		});
	};

	const logUserIn = async (email, password) => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			headers: { "content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		let data = await response.json();
		if (data.name) {
			localStorage.setItem("token", data.token);
			store.access_token.token = data.token;
		}
		console.log(store.access_token);
	};

	const handleLogin = () => {
		console.log(userLogin);
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
								<Link to={store.access_token ? "/profile" : "/"}>
									<button type="button" className="btn bg-prin" onClick={handleLogin}>
										Log in
									</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
