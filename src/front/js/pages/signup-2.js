import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NormalInput } from "../component/normalInput";
import { ButtonType } from "../component/buttonType";

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

		const res = await fetch(`${process.env.BACKEND_URL}/api/create-user`, {
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
		if (resJson) {
			localStorage.setItem("user_id", resJson);
		}
		actions.updateInitialUser({});
		History.push("/signup-3");
	}

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white">
					<h1 className="question-text">Hola {name}, lo primero es tu seguridad</h1>
					<form onSubmit={createUser}>
						<div className="d-flex flex-nowrap align-items-center">
							<NormalInput
								type={passwordShown ? "text" : "password"}
								placeholder="Contraseña"
								value={password}
								set={setPassword}
								icon="fa fa-userfas fa-key"
								required={false}
							/>

							<i onClick={togglePasswordVisiblity} className="mb-3 mx-2 p-3">
								{eye}
							</i>
						</div>
						<ButtonType type="submit" value="Siguiente" />
					</form>
				</div>
			</div>
		</div>
	);
};
