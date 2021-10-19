import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LogoutButton from "./LogoutButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AltLogo } from "./altLogo";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/";

export const Navbar = () => {
	const MenuItems = [
		{
			title: "Perfil",
			url: "/profile",
			cName: "nav-links"
		},
		{
			title: "Encuentra tu piña",
			url: "/list-of-women",
			cName: "nav-links"
		},
		{
			title: "Tus Piñas",
			// lista de chats
			url: "",
			cName: "nav-links"
		}
	];

	const { store, actions } = useContext(Context);
	const [isClicked, setIsClicked] = useState(false);
	const handleClicked = () => {
		setIsClicked(isClicked ? false : true);
		console.log(isClicked);
	};

	const logIn = (
		<>
			<li>
				<Link className="nav-links-mobile secondary" to="/login">
					Log In
				</Link>
			</li>
			{/* <li className="nav-links-mobile">
				<Link to="/signup-1">Sign Up</Link>
			</li> */}
		</>
	);

	if (store.user_id == null && store.access_token == null) {
		console.log(store.user_id);
		return (
			<nav className="navbarItems">
				<AltLogo />
				<ul className="nav-menu-login">{logIn}</ul>
			</nav>
		);
	} else {
		return (
			<nav className="navbarItems">
				<AltLogo />
				<div className="menu-icon" onClick={handleClicked}>
					{isClicked ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
				</div>
				<ul className={isClicked ? "nav-menu active" : "nav-menu"}>
					{MenuItems.map((Item, index) => {
						return (
							<li key={index}>
								<Link className={Item.cName} to={Item.url}>
									{Item.title}
								</Link>
							</li>
						);
					})}
					<LogoutButton />
				</ul>
			</nav>
		);
	}
};
