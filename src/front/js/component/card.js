import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { HashtagProfile } from "./hashtagProfile";
import avatar1 from "../../img/avatar1.png";

export const Card = ({ result }) => {
	const { store, actions } = useContext(Context);
	const [buttonText, setButtonText] = useState("Conectar");

	const matchUser = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/asks/${result.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			if (data.chat) {
				actions.notificationAlert(
					"¡Has encontrado una media piña!",
					`Ahora tienes disponible un chat con ${result.name}.`,
					"success",
					"cerrar"
				);
				setButtonText("¡Piña conectada!");
			} else setButtonText("¡Piña madurando!");
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
					<img className="avatar-img" src={result.profile_img ? result.profile_img : avatar1} alt="user" />
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
						<button className="button primary " onClick={matchUser}>
							{buttonText}
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
	result: propTypes.object
};
