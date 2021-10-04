import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();
	console.log(location.pathname);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{location.pathname === "/list-of-women" ? (
						<Link to="/profile">
							<button className="btn btn-primary">Perfil</button>
						</Link>
					) : (
						<Link to="/login">
							<button className="btn btn-primary">Log In</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
