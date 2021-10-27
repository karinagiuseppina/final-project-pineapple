import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { HashtagProfile } from "./hashtagProfile";
import avatar1 from "../../img/avatar1.png";

export const PendingUsersCard = ({ result }) => {
	const { store, actions } = useContext(Context);
	const [buttonText, setButtonText] = useState("Conectar");

	return (
		<div className="card-result">
			<div className="card-top-banner" />
			<div className="card-body little-profile px-4 pt-0 pb-4">
				<div className="pro-img text-center">
					<img src={result.profile_img ? result.profile_img : avatar1} alt="user" />
				</div>
				<h3 className="text-center text-prin">{result.name ? result.name : ""}</h3>
				<p className="text-start px-md-4 py-md-2 p-1">{result.description ? result.description : ""}</p>

				<div className="row justify-content-end">
					<div className="col-12 d-flex flex-wrap justify-content-center">
						{result.age ? <HashtagProfile icon="fas fa-history" text={`${result.age} años`} /> : ""}
						{result.abortion_num ? (
							<HashtagProfile
								icon="fas fa-hand-holding-medical"
								text={`${result.abortion_num} pérdida(s)`}
							/>
						) : (
							""
						)}
						{result.center ? (
							<HashtagProfile icon="fas fa-map-marker" text={`Centro ${result.center}`} />
						) : (
							""
						)}

						{result.process ? (
							<HashtagProfile icon="fas fa-search" text={`${result.process} año(s) en búsqueda`} />
						) : (
							""
						)}

						{result.treatment ? (
							<HashtagProfile icon="fas fa-briefcase-medical" text={result.treatment} />
						) : (
							""
						)}

						{result.couple ? <HashtagProfile icon="fas fa-heart" text={result.couple} /> : ""}
					</div>
				</div>
			</div>
			<div className="card-footer p-4">
				<div className="row justify-content-center">
					<div className="col-8 col-md-4 text-center">
						<Link to={`/moreUserInfo/${result.id}`}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

PendingUsersCard.propTypes = {
	result: propTypes.object
};
