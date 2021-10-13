import React from "react";
import { Link } from "react-router-dom";
import { ButtonType } from "../component/buttonType";

export const Signup3 = () => {
	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
					<h1 className="question-text"> ¡Queremos conocerte mejor!</h1>
					<h6 className="p-3">
						Sabemos que es dificil pero para encontrar tu media piña necesitamos toda la informacion que nos
						puedas dar. Recuerda que todas Las preguntas son opcionales.
					</h6>
					<div className="d-flex flex-column-reverse flex-md-row flex-nowrap justify-content-center pb-3">
						<Link to={"/list-of-women"}>
							<ButtonType type="submit" value="Saltar Cuestionario" />
						</Link>
						<Link to={"/signup-4"}>
							<ButtonType type="button" value="Siguiente" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
