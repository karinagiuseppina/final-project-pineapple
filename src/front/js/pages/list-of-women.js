import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { Card } from "../component/card";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
//import { Filter } from "../component/filter";

export const ListOfWomen = () => {
	const { store } = useContext(Context);
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.BACKEND_URL}/api/findpossiblematches`, {
				method: "GET",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token }
			});
			const data = await res.json();
			console.log(store.access_token);
			console.log(data);
			setResults(data);
			setwaiting(waiting + 1);
		})();
	}, [results]);

	console.log(results);

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
						{results.map(result => {
							return <Card result={result} key={result.id} />;
						})}
					</div>
				</div>
			);
		}
	}
};
