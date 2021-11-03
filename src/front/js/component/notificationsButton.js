import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

const NotificationsButton = ({ displayNotifications, setDisplayNotifications }) => {
	return (
		<div>
			<button
				type="button"
				className="button primary"
				onClick={() => setDisplayNotifications(!displayNotifications)}>
				<FontAwesomeIcon icon={solid("user-secret")} />
			</button>
		</div>
	);
};

NotificationsButton.propTypes = {
	displayNotifications: PropTypes.bool,
	setDisplayNotifications: PropTypes.func
};
export default NotificationsButton;
