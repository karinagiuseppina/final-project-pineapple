import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LogoutButton from "./LogoutButton.jsx";
import NotificationsList from "../pages/notificationsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { AltLogo } from "./altLogo";

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
			title: "Piñas madurando",
			url: "/users-connected",
			cName: "nav-links"
		},
		{
			title: "Piñas esperando",
			url: "/friend-requests",
			cName: "nav-links"
		},
		{
			title: "Tus Piñas",
			url: "/chat",
			cName: "nav-links"
		}
	];

	const { store, actions } = useContext(Context);
	const [isClicked, setIsClicked] = useState(false);
	const [displayNotifications, setDisplayNotifications] = useState(false);
	const [insideUl, setInsideUl] = useState(true);
	const notificationsList = store.notifications;

	console.log(isClicked);
	const handleClicked = () => {
		setIsClicked(isClicked ? false : true);
	};
	useEffect(() => {
		setIsClicked(false);
	}, []);

	const logIn = (
		<li>
			<Link className="nav-links-mobile secondary" to="/login">
				Log In
			</Link>
		</li>
	);
	console.log("from navbar: ", notificationsList);
	const notificationsButton = (
		<button
			type="button"
			className={
				notificationsList.some(notification => {
					return notification.is_new;
				})
					? "button-notifications-on"
					: "button-notifications-off"
			}
			onClick={() => setDisplayNotifications(!displayNotifications)}>
			<FontAwesomeIcon
				className={
					notificationsList.some(notification => {
						return notification.is_new;
					})
						? "bell-icon-on"
						: "bell-icon-off"
				}
				icon={faBell}
			/>
		</button>
	);

	const showNotificationsBox = displayNotifications ? <NotificationsList /> : null;

	if (store.user_id === null && store.access_token === null) {
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

				<div className="navbar-items-wrapper">
					<div className="menu-icon" onClick={handleClicked}>
						{isClicked ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
					</div>
					<div className="notifications-container">
						{notificationsButton}
						{showNotificationsBox}
						{console.log("from btn: ", notificationsList)}
					</div>
					<ul className={isClicked ? "nav-menu active" : "nav-menu"}>
						{MenuItems.map((Item, index) => {
							return (
								<li key={index} onClick={handleClicked}>
									<Link className={Item.cName} to={Item.url}>
										{Item.title}
									</Link>
								</li>
							);
						})}
						<LogoutButton setIsClicked={setIsClicked} isClicked={isClicked} />
					</ul>
				</div>
			</nav>
		);
	}
};
