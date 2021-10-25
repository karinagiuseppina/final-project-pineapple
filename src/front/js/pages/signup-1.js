import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { NormalInput } from "../component/normalInput";

export const Signup1 = () => {
	let History = useHistory();
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [email, setEmail] = useState("");
	const [user, setUser] = useState({});

	function saveInfo(event) {
		event.preventDefault();
		setUser(((user.name = name), (user.age = age), (user.email = email)));
		actions.updateInitialUser(user);
		History.push("/signup-2");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Nos conocemos?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>

			<form onSubmit={saveInfo}>
				<NormalInput type="text" placeholder="Nombre" value={name} set={setName} required={true} />
				<NormalInput type="number" placeholder="Edad" value={age} set={setAge} required={true} />
				<NormalInput type="email" placeholder="Email" value={email} set={setEmail} required={true} />
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
				</div>
			</form>
		</div>
	);
};
