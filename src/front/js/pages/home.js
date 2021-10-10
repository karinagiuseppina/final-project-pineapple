import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Fivnder</h1>
			<Link to={"/signup"}>Encuentra tu media piña</Link>
			<Link to={"/login"}>Log In</Link>
			<Link to={"/chat"}>Chat</Link>
		</div>
	);
};
