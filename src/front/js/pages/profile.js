import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { HashtagProfile } from "../component/hashtagProfile";
import { ButtonType } from "../component/buttonType";
import { AvatarImage } from "../component/avataImage";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({});

	const getUserData = async id => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/show-info/${id}`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json" }
		});
		if (resp.ok) {
			const user_data = await resp.json();
			setUser(user_data);
		} else if (resp.status === 401 || resp.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else getUserData();
		}
	};

	useEffect(() => {
		getUserData(actions.getUserId());
	}, []);

	return (
		<div className="card-result">
			<div className="card-body">
				<div className="pro-img text-center">
					<AvatarImage profileImg={user.profile_img} classN={"avatar-img"} Atl={"avatar small image"} />
				</div>
				<h2 className="text-center text-prin">{user.name ? user.name : ""}</h2>
				<p className="text-start px-md-4 py-md-2">{`${user.age} años`}</p>
				{user.description ? <p className="text-description px-md-4 py-md-2 p-1">{user.description}</p> : ""}

				<div className="row justify-content-end">
					<div className="col-12 d-flex flex-wrap justify-content-center">
						{user.abortion_num ? <HashtagProfile text={`${user.abortion_num} muerte gestacional`} /> : ""}
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
						<Link to={"/editProfile"}>
							<ButtonType classN="button primary" type="button" value="Editar mi perfil" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
