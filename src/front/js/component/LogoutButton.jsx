import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const LogoutButton = () => {
	const { store, actions } = useContext(Context);
	const revokeAccessToken = () => {
		localStorage.removeItem("token");
		store.access_token.token = "";
	};

	return (
		<div className="row justify-content-center">
			<div className="col text-center">
				<button type="button" className="btn bg-prin" onClick={revokeAccessToken}>
					Log out
				</button>
			</div>
		</div>
	);
};

export default LogoutButton;
