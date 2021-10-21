import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { SelectOptionForm } from "../component/selectOptionForm";

export const Signup8 = () => {
	let History = useHistory();
	const [centers, setCenters] = useState([]);
	const [centerid, setCenterid] = useState("");
	const [centersInHTML, setCentersInHTML] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.BACKEND_URL}/api/centers`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			setCenters(data);
		})();
	}, []);
	useEffect(
		() => {
			setCentersInHTML(
				centers.map(center => {
					let isChecked = center.id === centerid ? true : false;
					return (
						<SelectOptionForm
							colClass={center.id == 3 ? "col-12 p-1" : "col-6 p-1"}
							code={`t-${center.id}`}
							key={`t-${center.id}`}
							generalName="center"
							id={center.id}
							set={setCenterid}
							option={center.type}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[centers, centerid]
	);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-center`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				center_id: centerid,
				user_id: userId
			})
		});
		History.push("/list-of-women");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿A que centros has acudido?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{centersInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Tu media piña" />
					</div>
					<div className="col-12 col-md-4">
						<Link to={"/profile"}>
							<ButtonType classN="button secondary" type="button" value="Mi Perfil" />
						</Link>
					</div>
				</div>
			</form>

			{/* <ProgressBar now={20} /> */}
		</div>
		// <div className="container-fluid bg-lightgray p-4">
		// 	<div className="row justify-content-center">
		// 		<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
		// 			{/* <ProgressBar now={100} /> */}
		// 			<h1 className="pt-3">¿A que centros has acudido?</h1>
		// 			<form onSubmit={updateInfo}>
		// 				<div className="row p-2">{centersInHTML}</div>

		// 				<div className="d-flex flex-sm-column flex-md-row flex-nowrap justify-content-center pb-3">
		// 					<Link to={"/list-of-women"} className="text-decoration-none">
		// 						<ButtonType type="button" value="Saltar Cuestonario" />
		// 					</Link>
		// 					<ButtonType type="submit" value="Siguiente" />
		// 				</div>
		// 			</form>
		// 		</div>
		// 	</div>
		// </div>
	);
};
