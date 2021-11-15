import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { HashtagProfile } from "./hashtagProfile";

import avatar1 from "../../img/avatar1.png";
import avatar2 from "../../img/avatar2.png";
import avatar3 from "../../img/avatar3.png";

export const Card = ({ result, deleteElementFromList }) => {
	const { store, actions } = useContext(Context);

	const avatars = [avatar1, avatar2, avatar3];

	function avatarRandomImage(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		const avatar = array[randomIndex];
		return avatar;
	}

	async function setImage() {
		const userId = result.id;
		await fetch(`${process.env.BACKEND_URL}/api/set-image`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				profile_img: avatarRandomImage(avatars),
				user_id: userId
			})
		});
	}

	const matchUser = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/asks/${result.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			deleteElementFromList(result.id);
			if (data.chat) {
				actions.notificationAlert(
					"¡Has encontrado una media piña!",
					`Ahora tienes disponible un chat con ${result.name}.`,
					"success",
					"cerrar"
				);
			}
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else matchUser();
		}
	};
	return (
		<div className="card-result">
			<div className="card-body">
				<div className="pro-img text-center">
					<img
						className="avatar-img"
						src={result.profile_img ? result.profile_img : setImage()}
						alt="samll avatar image"
					/>
				</div>
				<h2 className="text-center text-prin">{result.name ? result.name : ""}</h2>
				<p className="text-start px-md-4 py-md-2 p-1">{`${result.age} años`}</p>

				<div className="row justify-content-end">
					<div className="col-12 d-flex flex-wrap justify-content-center">
						{result.abortion_num ? <HashtagProfile text={`${result.abortion_num} pérdida(s)`} /> : ""}
						{result.center ? <HashtagProfile text={`Centro ${result.center}`} /> : ""}

						{result.process ? <HashtagProfile text={`${result.process} año(s) en búsqueda`} /> : ""}

						{result.treatment ? <HashtagProfile text={result.treatment} /> : ""}

						{result.couple ? <HashtagProfile text={result.couple} /> : ""}
					</div>
				</div>
			</div>

			<div className="card-footer p-4">
				<div className="row justify-content-center">
					<div className="col-12 col-md-6">
						<button className="button primary" onClick={matchUser}>
							Conectar
						</button>
					</div>
					<div className="col-12 col-md-6">
						<Link to={`/moreUserInfo/${result.id}`}>
							<button className="button secondary">mas info</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	result: propTypes.object,
	deleteElementFromList: propTypes.func
};
