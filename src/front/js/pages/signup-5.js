import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { NormalInput } from "../component/normalInput";

export const Signup5 = () => {
	const [numAbortos, SetNumAbortos] = useState("");
	let History = useHistory();

	function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");

		fetch(`${process.env.BACKEND_URL}/api/update-abortion`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				abortion_num: numAbortos,
				user_id: userId
			})
		});
		History.push("/signup-6");
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿Has sufrido alguna perdida?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>

			<form onSubmit={updateInfo}>
				<NormalInput
					type="number"
					placeholder="Número de Pérdidas"
					value={numAbortos}
					set={SetNumAbortos}
					icon="fa fa-user"
					required={false}
				/>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Continuar" />
					</div>
					<div className="col-6 col-md-4">
						<Link to={"/signup-6"}>
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
		</div>

		// <div className="container-fluid bg-lightgray p-4">
		// 	<div className="row justify-content-center">
		// 		<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
		// 			<h1 className="question-text">¿Has sufrido alguna perdida? </h1>
		// 			<form onSubmit={updateInfo}>
		// 				<div className="row justify-content-center">
		// 					<div className="col">
		// 						<div className="row p-4">
		// 							<NormalInput
		// 								type="number"
		// 								placeholder="Número de Pérdidas"
		// 								value={numAbortos}
		// 								set={SetNumAbortos}
		// 								icon="fas fa-calendar-check"
		// 								required={false}
		// 							/>
		// 						</div>
		// 						<div className="d-flex flex-sm-column flex-md-row flex-nowrap justify-content-center pb-3">
		// 							<Link to={"/list-of-women"} className="text-decoration-none">
		// 								<ButtonType type="button" value="Saltar Cuestonario" />
		// 							</Link>
		// 							<Link to={"/signup-6"} className="text-decoration-none">
		// 								<ButtonType type="button" value="Saltar Pregunta" />
		// 							</Link>
		// 							<ButtonType type="submit" value="Siguiente" />
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</form>

		// 			{/* <ProgressBar now={40} /> */}
		// 		</div>
		// 	</div>
		// </div>
	);
};
