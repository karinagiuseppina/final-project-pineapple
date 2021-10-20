import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { NormalInput } from "../component/normalInput";
import Swal from "sweetalert2";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [userAlreadyLoggedIn, setUserAlreadyLoggedIn] = useState(false);
	const [userId, setUserId] = useState("");

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

			if (data.name) {
				localStorage.setItem("token", data.token);
				store.access_token.token = data.token;
				store.access_token.id = JSON.stringify(data.user_id);
				setUserId(store.access_token.id);
			}
		} else {
			badLoginAlert();
		}
	};

	const handleLogin = () => {
		logUserIn(loginData.email, loginData.password);
		console.log("from handleLogin: ", store.access_token);
		setUserId("");
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
								<Link to={`/profile/${userId}`}>
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
