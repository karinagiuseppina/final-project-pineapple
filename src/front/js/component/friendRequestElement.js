import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import avatar1 from "../../img/avatar1.png";

export const FriendRequestElement = ({ result }) => {
	const { store, actions } = useContext(Context);

	const acceptFriendRequest = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/asks/${result.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			if (data.chat) {
				actions.notificationAlert(
					"¡Media piña aceptada!",
					`Ahora tienes disponible un chat con ${result.name}.`,
					"success",
					"cerrar"
				);
			}
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else acceptFriendRequest();
		}
	};

	const declineFriendRequest = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/decline_user_connected/${result.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			if (data.chat) {
				actions.notificationAlert(
					"¡Media piña rechazada!",
					`Has rechazado la solicitud de ${result.name}.`,
					"success",
					"cerrar"
				);
			}
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else deleteFriendRequest();
		}
	};

	return (
		<div className="list-box">
			<div className="pending-user-card-left-col">
				<img src={result.profile_img ? result.profile_img : avatar1} className="avatar-request" alt="user" />
			</div>
			<div className="pending-user-card-right-col">
				<Link to={`/moreUserInfo/${result.id}`} className="text-decoration-none">
					<h3 className="text-center text-prin">{result.name ? result.name : ""}</h3>
				</Link>
				<div className="buttons-row">
					<button onClick={acceptFriendRequest} className="button primary">
						Aceptar
					</button>

					<button onClick={declineFriendRequest} className="button secondary">
						Rechazar
					</button>
				</div>
			</div>
		</div>
	);
};

FriendRequestElement.propTypes = {
	result: propTypes.object
};
