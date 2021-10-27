import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { Card } from "../component/card";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//import { Filter } from "../component/filter";

export const ListOfWomen = () => {
	const { store, actions } = useContext(Context);
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);

	useEffect(() => {
		getPossibleMatches();
	}, []);

	const getPossibleMatches = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/findpossiblematches`, {
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
					<p>Tu media piña aun esta madurando, puedes probar ha cambiar algunas opciones en el filtro.</p>
				</div>
			);
		} else {
			return (
				<div className="App-box">
					<div className="col">
						{results.map((result, i) => {
							return <Card result={result} key={i} />;
						})}
					</div>
				</div>
			);
		}
	}
};
