import React, { Component, useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { HashtagProfile } from "./hashtagProfile";
import avatar1 from "../../img/avatar1.png";

export const Card = ({ result }) => {
	const [user, setUser] = useState({});

	const getUserData = async id => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/show-info/${id}`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json" }
		});
		if (resp.ok) {
			const user_data = await resp.json();
			setUser(user_data);
		}
	};

	useEffect(() => {
		getUserData(result.id);
	}, []);

	return (
		<div className="card-result">
			<div className="card-top-banner" />
			<div className="card-body little-profile px-4 pt-0 pb-4">
				<div className="pro-img text-center">
					<img src={user.profile_img ? user.profile_img : avatar1} alt="user" />
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
						{user.center ? <HashtagProfile icon="fas fa-map-marker" text={`Centro ${user.center}`} /> : ""}

						{user.process ? (
							<HashtagProfile icon="fas fa-search" text={`${user.process} año(s) en búsqueda`} />
						) : (
							""
						)}

						{user.treatment ? <HashtagProfile icon="fas fa-briefcase-medical" text={user.treatment} /> : ""}

						{user.couple ? <HashtagProfile icon="fas fa-heart" text={user.couple} /> : ""}
					</div>
				</div>
			</div>

			<div className="card-footer p-4">
				<div className="row justify-content-center">
					<div className="col-8 col-md-4 text-center">
						<button>contactar</button>
						<Link to={`/moreUserInfo/${user.id}`}>
							<button>mas info</button>
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
