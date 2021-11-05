import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

const NotificationsList = () => {
	const { store, actions } = useContext(Context);
	const [notificationsList, setNotificationsList] = useState([]);
	const [hovered, setHovered] = useState(false);

	const user_id = store.user_id;
	const notificationSeen = "li-seen";

	const isHovered = listItem => {
		listItem.is_new = false;
	};

	const getNotifications = async (id, setFn) => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}/notifications`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (response.ok) {
			const data = await response.json();

			setFn(data.notification);
		}
	};

	useEffect(() => {
		getNotifications(user_id, setNotificationsList);
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
								li
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

/* 		<div className="col-4 d-flex">
			{notificationsList >= 1 ? (
				<ul className="list-group flex-column">
					{notificationsList.map((notification, index) => {
						return (
							<li className="list-item -fs-6" key={index}>
								{notification}
							</li>
						);
					})}
				</ul>
			) : (
				<ul>
					<li className="list-item fs-6">No tienes notificaciones de momento..</li>
				</ul>
			)}
		</div> */
/*  */
/* 		<div className="container">
		<div className="row justify-content-center text-center">
			<div className="col-md-5">
				<div className="dropdown custom-dropdown">
					<a
						href="#"
						data-toggle="dropdown"
						className="dropdown-link"
						aria-haspopup="true"
						aria-expanded="false">
						<span className="wrap-icon icon-notifications"></span>
						<span className="number">5</span>
					</a>

					<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
						<div className="title-wrap d-flex align-items-center">
							<h3 className="title mb-0">Notifications</h3>
							<a href="#" className="small ml-auto">
								Mark all as read
							</a>
						</div>

						<ul className="custom-notifications">
							<li className="unread">
								<a href="#" className="d-flex">
									<div className="img mr-3">
										<img src="images/person_1.jpg" alt="Image" className="img-fluid" />
									</div>
									<div className="text">
										<strong>Claudia Gideon</strong> marked the task done a day ago
									</div>
								</a>
							</li>

							<li className="unread">
								<a href="#" className="d-flex">
									<div className="img mr-3">
										<img src="images/person_2.jpg" alt="Image" className="img-fluid" />
									</div>
									<div className="text">
										<strong>Alex Stafford</strong> marked the task done a day ago
									</div>
								</a>
							</li>

							<li>
								<a href="#" className="d-flex">
									<div className="img mr-3">
										<img src="images/person_3.jpg" alt="Image" className="img-fluid" />
									</div>
									<div className="text">
										<strong>Devin Richards</strong> mentioned you in her comment on Invoices 2
										days ago
									</div>
								</a>
							</li>

							<li className="">
								<a href="#" className="d-flex">
									<div className="img mr-3">
										<img src="images/person_2.jpg" alt="Image" className="img-fluid" />
									</div>
									<div className="text">
										<strong>Alex Stafford</strong> marked the task done a day ago
									</div>
								</a>
							</li>

							<li>
								<a href="#" className="d-flex">
									<div className="img mr-3">
										<img src="images/person_3.jpg" alt="Image" className="img-fluid" />
									</div>
									<div className="text">
										<strong>Devin Richards</strong> mentioned you in her comment on Invoices 2
										days ago
									</div>
								</a>
							</li>
						</ul>
						<p className="text-center m-0 p-0">
							<a href="#" className="small">
								View All
							</a>
						</p>
						<a href="#" className="dropdown-item">
							All Rources
						</a>
						<a href="#" className="dropdown-item">
							<strong>Dropbox</strong>
							<span>Lorem ipsum dolor sit amet harum.</span>
						</a>
						<a href="#" className="dropdown-item">
							<strong>Google Drive</strong>
							<span>Lorem ipsum dolor sit amet harum.</span>
						</a>
						<a href="#" className="dropdown-item">
							<strong>Eventbrite</strong>
							<span>Lorem ipsum dolor sit amet harum.</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div> */
