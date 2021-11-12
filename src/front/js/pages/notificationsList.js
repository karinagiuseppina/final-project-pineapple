import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const NotificationsList = () => {
	const { store, actions } = useContext(Context);
	//const [notificationsList, setNotificationsList] = useState(store.notifications);
	const [hovered, setHovered] = useState(false);

	const notificationsList = store.notifications;
	const setNotificationsList = actions.setNotificationsList;

	const user_id = store.user_id;
	const notificationSeen = "li-seen";

	const isHovered = listItem => {
		listItem.is_new = false;
	};

	useEffect(() => {
		actions.getNotifications();
	}, []);

	return (
		<div className="notifications-wrapper">
			{notificationsList.length > 0 ? (
				<ul className="notifications-ul list-group">
					{notificationsList.map((notification, index) => {
						return (
							<li
								className={
									notification.is_new === false
										? `list-group-item ${notificationSeen}`
										: "list-group-item li"
								}
								onMouseOver={isHovered(notification)}
								key={index}>
								{notification.name}
							</li>
						);
					})}
				</ul>
			) : (
				<ul className="notifications-ul list-group">
					<li className="list-group-item">No tienes notificaciones de momento..</li>
				</ul>
			)}
		</div>
	);
};

export default NotificationsList;
