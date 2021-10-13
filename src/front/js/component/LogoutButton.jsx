import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const LogoutButton = () => {
	const { store, actions } = useContext(Context);
	const revokeAccessToken = () => {
		actions.deleteUserSession();
	};

	return (
		<li className="nav-item" onClick={revokeAccessToken}>
			Log out
		</li>
	);
};

export default LogoutButton;
