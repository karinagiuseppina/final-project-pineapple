import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { HashtagProfile } from "../component/hashtagProfile";

export const MoreUserInfo = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({});
	const { id } = useParams();
	const [buttonText, setButtonText] = useState("Conectar");
	const [waiting, setwaiting] = useState(0);

	const matchUser = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/asks/${id}`, {
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
				actions.getNotifications();
			} else setButtonText("¡Piña madurando!");
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else matchUser();
		}
	};

	const getUserData = async id => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/show-info/${id}`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json" }
		});
		if (resp.ok) {
			const user_data = await resp.json();
			setUser(user_data);
			setwaiting(1);
		}
	};

	useEffect(() => {
		getUserData(id);
	}, []);
	if (waiting === 0) {
		return (
			<div className="card-result">
				<div className="card-body">
					<div className="pro-img text-center">
						<img
							className="avatar-img"
							src={user.profile_img ? user.profile_img : ""}
							alt="avatar small image"
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="card-result">
				<div className="card-body">
					<div className="pro-img text-center">
						<img
							className="avatar-img"
							src={user.profile_img ? user.profile_img : ""}
							alt="avatar small image"
						/>
					</div>
					<h2 className="text-center text-prin">{user.name ? user.name : ""}</h2>
					<p className="text-start px-md-4 py-md-2">{`${user.age} años`}</p>
					{user.description ? <p className="text-description px-md-4 py-md-2 p-1">{user.description}</p> : ""}

					<div className="row justify-content-end">
						<div className="col-12 d-flex flex-wrap justify-content-center">
							{user.abortion_num ? (
								<HashtagProfile text={`${user.abortion_num} muerte(s) gestacional(es)`} />
							) : (
								""
							)}
							{user.center ? <HashtagProfile text={`Centro ${user.center}`} /> : ""}

							{user.process ? <HashtagProfile text={`${user.process} año(s) en búsqueda`} /> : ""}

							{user.treatment ? <HashtagProfile text={user.treatment} /> : ""}

							{user.couple ? <HashtagProfile text={user.couple} /> : ""}
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
							<Link to={`/list-of-women`}>
								<button className="button secondary">Ver otras piñas</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
