import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { ButtonType } from "../component/buttonType";
import { SelectOptionForm } from "../component/selectOptionForm";
import { Context } from "../store/appContext";

export const Signup7 = () => {
	let History = useHistory();
	const [treatments, setTreatments] = useState([]);
	const [treatmentid, setTreatmentid] = useState("");
	const [treatmentsInHTML, setTreatmentsInHTML] = useState([]);
	const { actions } = useContext(Context);

	useEffect(() => {
		actions.getElements("treatments", setTreatments);
	}, []);
	useEffect(
		() => {
			setTreatmentsInHTML(
				treatments.map(treatment => {
					let isChecked = treatment.id === treatmentid ? true : false;
					return (
						<SelectOptionForm
							colClass="col-12 col-md-4 p-1"
							code={`t-${treatment.id}`}
							key={`t-${treatment.id}`}
							generalName="treatment"
							id={treatment.id}
							set={setTreatmentid}
							option={treatment.type}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[treatments, treatmentid]
	);

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("user_id");
		await fetch(`${process.env.BACKEND_URL}/api/update-treatment`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				treatment_id: treatmentid,
				user_id: userId
			})
		});
		History.push("/signup-8");
	}

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white text-center">
					<h1 className="pt-3">¿Que tratamiento estas siguendo?</h1>
					<form onSubmit={updateInfo}>
						<div className="row p-2">{treatmentsInHTML}</div>

						<div className="d-flex flex-sm-column flex-md-row flex-nowrap justify-content-center pb-3">
							<Link to={"/list-of-women"} className="text-decoration-none">
								<ButtonType type="button" value="Saltar Cuestonario" />
							</Link>
							<Link to={"/signup-8"} className="text-decoration-none">
								<ButtonType type="button" value="Saltar Pregunta" />
							</Link>
							<ButtonType type="submit" value="Siguiente" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
