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
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white">
					<div className="signup-header text-center">
						<h1 className="question-text">¿Nos conocemos?</h1>
						<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
					</div>

					<form onSubmit={saveInfo}>
						<NormalInput
							type="text"
							placeholder="Nombre"
							value={name}
							set={setName}
							icon="fa fa-user"
							required={true}
						/>
						<NormalInput
							type="number"
							placeholder="Edad"
							value={age}
							set={setAge}
							icon="fas fa-calendar-check"
							required={true}
						/>
						<NormalInput
							type="email"
							placeholder="Email"
							value={email}
							set={setEmail}
							icon="fa fa-envelope"
							required={true}
						/>
						<ButtonType type="submit" value="Siguiente" />
					</form>
				</div>
			</div>
		</div>
	);
};
