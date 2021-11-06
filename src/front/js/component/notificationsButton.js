import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

const NotificationsButton = ({ displayNotifications, setDisplayNotifications }) => {
	return (
		<button
			type="button"
			className="button-notifications primary"
			onClick={() => setDisplayNotifications(!displayNotifications)}>
			<FontAwesomeIcon className="bell-icon" icon={faBell} />
		</button>
	);
};

NotificationsButton.propTypes = {
	displayNotifications: PropTypes.bool,
	setDisplayNotifications: PropTypes.func
};
export default NotificationsButton;
