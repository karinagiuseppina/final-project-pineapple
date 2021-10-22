import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { SelectOptionForm } from "../component/selectOptionForm";
import { ButtonType } from "../component/buttonType";
import { Context } from "../store/appContext";

export const Signup6 = () => {
	const { actions } = useContext(Context);
	let History = useHistory();
	const [coupleOPtions, setCoupleOPtions] = useState([]);
	const [coupleid, setCoupleid] = useState("");
	const [couplesInHTML, setCouplesInHTML] = useState([]);

	useEffect(() => {
		actions.getElements("couples", setCoupleOPtions);
	}, []);

	useEffect(() => {
		setCouplesInHTML(
			coupleOPtions.map(couple => {
				let isChecked = couple.id === coupleid ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-6 p-1"
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
	}, [coupleOPtions, coupleid]);

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
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
					<h1 className="question-text">¿Tienes una relacion?</h1>
					<form onSubmit={updateInfo}>
						<div className="row p-2">{couplesInHTML}</div>
						<div className="d-flex flex-sm-column flex-md-row flex-nowrap justify-content-center pb-3">
							<Link to={"/list-of-women"} className="text-decoration-none">
								<ButtonType type="button" value="Saltar Cuestionario" />
							</Link>
							<Link to={"/signup-7"} className="text-decoration-none">
								<ButtonType type="button" value="Saltar Pregunta" />
							</Link>
							<ButtonType type="submit" value="Siguiente" />
						</div>
					</form>
					<ProgressBar now={60} />
				</div>
			</div>
		</div>
	);
};
