import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { HashtagProfile } from "../component/hashtagProfile";

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
		<div className="container-fluid bg-light p-md-4 p-0">
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6">
					<div className="card">
						<div className="card-top-banner" />
						<div className="card-body little-profile px-4 pt-0 pb-4">
							<div className="pro-img text-center">
								<img
									src={user.profile_img ? user.profile_img : "https://via.placeholder.com/128"}
									alt="user"
								/>
							</div>
							<h3 className="text-center text-prin">{user.name ? user.name : ""}</h3>
							<p className="text-start px-md-4 py-md-2 p-1">{user.description ? user.description : ""}</p>

							<div className="row justify-content-end">
								<div className="col-12 d-flex flex-wrap justify-content-center">
									{user.age ? <HashtagProfile icon="fas fa-history" text={`${user.age} años`} /> : ""}
									{user.abortion_num ? (
										<HashtagProfile
											icon="fas fa-hand-holding-medical"
											text={`${user.abortion_num} pérdida(s)`}
										/>
									) : (
										""
									)}
									{user.center ? (
										<HashtagProfile icon="fas fa-map-marker" text={`Centro ${user.center}`} />
									) : (
										""
									)}

									{user.process ? (
										<HashtagProfile
											icon="fas fa-search"
											text={`${user.process} año(s) en búsqueda`}
										/>
									) : (
										""
									)}

									{user.treatment ? (
										<HashtagProfile icon="fas fa-briefcase-medical" text={user.treatment} />
									) : (
										""
									)}

									{user.couple ? <HashtagProfile icon="fas fa-heart" text={user.couple} /> : ""}
								</div>
							</div>
						</div>

						<div className="card-footer p-4">
							<div className="row justify-content-center">
								<div className="col-8 col-md-4 text-center">
									<Link to="/editprofile">
										<button
											type="button"
											className="btn border-0 p-3 rounded bg-prin text-white w-100 text-uppercase font-size-small my-1">
											<i className="fas fa-user-cog mx-2" />
											Editar Perfil
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
