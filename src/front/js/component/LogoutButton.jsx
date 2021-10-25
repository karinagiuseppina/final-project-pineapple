import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const revokeAccessToken = () => {
		actions.deleteUserSession();
		history.push("/");
	};

	return (
		<li className="nav-links-mobile alert" onClick={revokeAccessToken}>
			Log out
		</li>
	);
};

export default LogoutButton;
