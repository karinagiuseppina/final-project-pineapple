import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { SelectOptionForm } from "../component/selectOptionForm";
import { ButtonType } from "../component/buttonType";

export const Signup6 = () => {
	let History = useHistory();
	const [coupleOPtions, setCoupleOPtions] = useState([]);
	const [coupleid, setCoupleid] = useState("");
	const [couplesInHTML, setCouplesInHTML] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.BACKEND_URL}/api/couples`, {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			setCoupleOPtions(data);
		})();
	}, []);

	useEffect(
		() => {
			setCouplesInHTML(
				coupleOPtions.map(couple => {
					let isChecked = couple.id === coupleid ? true : false;
					return (
						<SelectOptionForm
							colClass="col-6 p-1"
							code={`c-${couple.id}`}
							key={`c-${couple.id}`}
							generalName="couple"
							id={couple.id}
							set={setCoupleid}
							option={couple.option}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[coupleOPtions, coupleid]
	);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-couple`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				couple_id: coupleid,
				user_id: userId
			})
		});
		History.push("/signup-7");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Tienes una relacion?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{couplesInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/signup-7"}>
							<ButtonType classN="button secondary" type="button" value="Omitir" />
						</Link>
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/list-of-women"}>
							<ButtonType classN="button alert" type="button" value="Terminar" />
						</Link>
					</div>
				</div>
			</form>

			{/* <ProgressBar now={20} /> */}
		</div>

		// <div className="container-fluid bg-lightgray p-4">
		// 	<div className="row justify-content-center">
		// 		<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
		// 			<h1 className="question-text">¿Tienes una relacion?</h1>
		// 			<form onSubmit={updateInfo}>
		// 				<div className="row p-2">{couplesInHTML}</div>
		// 				<div className="d-flex flex-sm-column flex-md-row flex-nowrap justify-content-center pb-3">
		// 					<Link to={"/list-of-women"} className="text-decoration-none">
		// 						<ButtonType type="button" value="Saltar Cuestionario" />
		// 					</Link>
		// 					<Link to={"/signup-7"} className="text-decoration-none">
		// 						<ButtonType type="button" value="Saltar Pregunta" />
		// 					</Link>
		// 					<ButtonType type="submit" value="Siguiente" />
		// 				</div>
		// 			</form>
		// 			{/* <ProgressBar now={60} /> */}
		// 		</div>
		// 	</div>
		// </div>
	);
};
