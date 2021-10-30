import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const NotificationsList = () => {
	const { store, actions } = useContext(Context);
	const [notificationsList, setNotificationsList] = useState(store.notifications);

	const user_id = store.user_id;

	actions.getNotifications(user_id, setNotificationsList);

	return (
		<div>
			{notificationsList >= 1 ? (
				<ul className="list-group">
					{notificationsList.map((notification, index) => {
						return (
							<li key={index} className="list-item">
								{notification}
							</li>
						);
					})}
				</ul>
			) : (
				<ul>
					<li className="list-item">No tienes notificaciones de momento..</li>
				</ul>
			)}
		</div>
	);
};

export default NotificationsList;
