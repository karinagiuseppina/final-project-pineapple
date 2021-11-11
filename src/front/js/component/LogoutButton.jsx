import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import propTypes from "prop-types";

const LogoutButton = ({ setIsClicked, isClicked }) => {
	const history = useHistory();
	const { store, actions } = useContext(Context);
	const revokeAccessToken = () => {
		actions.deleteUserSession();
		history.push("/");
		setIsClicked(isClicked ? false : "");
	};

	return (
		<li className="nav-links-mobile alert" onClick={revokeAccessToken}>
			Log out
		</li>
	);
};

LogoutButton.propTypes = {
	setIsClicked: propTypes.func,
	isClicked: propTypes.bool
};

export default LogoutButton;
