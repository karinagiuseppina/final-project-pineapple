import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { Card } from "../component/card";
import { Link } from "react-router-dom";
//import { Filter } from "../component/filter";

export const ListOfWomen = () => {
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.BACKEND_URL}/api/findpossiblematches`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			console.log(data);
			setResults(data);
			setwaiting(waiting + 1);
		})();
	}, []);

	console.log(results);

	if (waiting === 0) {
		return (
			<div className="row row-cols-1 row-cols-md-3 g-4">
				<div className="col">
					<div className="card">
						<img src="..." className="card-img-top grey-box" alt="..." />
						<div className="card-body">
							<h5 className="card-title grey-box" />
							<ul className="list-group list-group-flush">
								<li className="list-group-item grey-box" />
								<li className="list-group-item grey-box" />
								<li className="list-group-item grey-box" />
								<li className="list-group-item grey-box" />
								<li className="list-group-item grey-box" />
								<li className="list-group-item grey-box" />
							</ul>
							<button grey-box />
							<Link>
								<button grey-box />
							</Link>
						</div>
					</div>
				</div>
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
				<div className="container">
					<div className="row row-cols-1 row-cols-md-3 g-4">
						<div className="col">
							{results.map(result => {
								return <Card result={result} key={result.id} />;
							})}
						</div>
					</div>
				</div>
			);
		}
	}
};
