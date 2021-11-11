import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { AltLogo } from "../component/altLogo";
import { useHistory } from "react-router";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		const token = actions.getAccessToken();
		if (token) {
			history.push("/list-of-women");
		}
	}, []);

	return (
		<div className="App-box">
			<h1>¡Somos una Piña!</h1>
			<img src={pinaPartidaNombre} alt={<AltLogo />} />
			<Link className="button primary" to={"/signup-1"}>
				Encuentra tu media piña
			</Link>
			<Link className="button secondary" to={"/login"}>
				Log In
			</Link>
		</div>
	);
};
