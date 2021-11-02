import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { FriendRequestElement } from "../component/friendRequestElement";
import { Context } from "../store/appContext";

export const FriendRequestList = () => {
	const { store, actions } = useContext(Context);
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);

	useEffect(() => {
		getFriendRequests();
	}, []);

	const getFriendRequests = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/user/users_asking`, {
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
			else getFriendRequests();
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
					<div className="row">
						<div className="col">
							{results.map((result, i) => {
								return <FriendRequestElement result={result} key={i} />;
							})}
						</div>
					</div>
				</div>
			);
		}
	}
};
