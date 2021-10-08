import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <h1 className="logo">Fivnder</h1> */}
			<img src={pinaPartidaNombre} />
			<Link to={"/signup-1"}>Encuentra tu media piña</Link>
			<Link to={"/login"}>Log In</Link>
		</div>
	);
};
