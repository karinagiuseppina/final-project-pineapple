import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import NotificationsList from "../pages/notificationsList";

const NotificationsButton = () => {
	const { store, actions } = useContext(Context);
	const [show, setShow] = useState(false);
	const token = store.access_token;
	const user_id = store.user_id;

	if (show) {
		return <NotificationsList />;
	}

	return (
		<div>
			{token && user_id ? (
				<button className="nav-links-mobile alert" onClick={setShow(true)}>
					Notificaciones
				</button>
			) : null}
		</div>
	);
};

export default NotificationsButton;
