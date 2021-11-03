import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { PendingUsersCard } from "../component/pendingUsersCard";
import { Context } from "../store/appContext";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";

export const WomenConnected = () => {
	const { store, actions } = useContext(Context);
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);

	useEffect(() => {
		getPendingUsers();
	}, []);

	const getPendingUsers = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/users_pending`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			setResults(data);
			setwaiting(waiting + 1);
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else getPossibleMatches();
		}
	};

	if (waiting === 0) {
		return (
			<div className="loading show">
				<div className="spin"></div>
			</div>
		);
	} else if (waiting == 1) {
		if (results.length == 0) {
			return (
				<div className="box-notfound">
					{/* <img src={pinaNotFound} /> */}
					<p>No tienes medias piñas pendientes. </p>
				</div>
			);
		} else {
			return (
				<div className="App-box">
					<div className="signup-header">
						<h1 className="question-text">Piñas madurando</h1>
						<div className="image-box">
							<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
						</div>
					</div>
					<div className="women-conected-list col">
						{results.map((result, i) => {
							return <PendingUsersCard result={result} key={i} asking={false} />;
						})}
					</div>
				</div>
			);
		}
	}
};
