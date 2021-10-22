import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LogoutButton from "./LogoutButton.jsx";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	let logOut = (
		<>
			<li className="nav-item">
				<Link to="/profile">Perfil</Link>
			</li>
			<LogoutButton />
			<li className="nav-item">
				<Link to="/chat">Chat</Link>
			</li>
		</>
	);

	let logIn = (
		<>
			<li className="nav-item">
				<Link to="/login">Sign In</Link>
			</li>
			<li className="nav-item">
				<Link to="/signup-1">Sign Up</Link>
			</li>
		</>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Navbar scroll
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"> </span>
				</button>
				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						{store.user_id !== null && store.access_token !== null ? logOut : logIn}
					</ul>
				</div>
			</div>
		</nav>
	);
};
