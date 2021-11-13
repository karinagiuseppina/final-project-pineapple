import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { AvatarImage } from "./avataImage";

export const PendingUsersCard = ({ result, deleteElementFromList }) => {
	const { store, actions } = useContext(Context);

	const deleteFriendRequest = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/delete_user_connected/${result.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			actions.notificationAlert(
				"¡Solicitud Cancelada!",
				`Has cancelado tu solicitud con ${result.name}.`,
				"success",
				"cerrar"
			);
			deleteElementFromList(result.id);
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else deleteFriendRequest();
		}
	};

	return (
		<div className="row list-box">
			<div className="col-4 col-lg-2">
				<img
					className="avatar-request"
					src={result.profile_img ? result.profile_img : ""}
					alt="avatar small image"
				/>
			</div>
			<div className="box col-8 col-lg-6  align-items-center">
				<Link to={`/moreUserInfo/${result.id}`} className="text-decoration-none">
					<h3 className="text-center text-prin">{result.name ? result.name : ""}</h3>
				</Link>
				<button onClick={deleteFriendRequest} className="button alert">
					Cancelar
				</button>
			</div>
		</div>
	);
};

PendingUsersCard.propTypes = {
	result: propTypes.object,
	deleteElementFromList: propTypes.func
};
