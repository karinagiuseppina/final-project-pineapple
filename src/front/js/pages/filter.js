import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import { SelectInput } from "../component/selectInput";
import { NormalInput } from "../component/normalInput";
import { FormTitle } from "../component/formTitle";
import { SelectOptionForm } from "../component/selectOptionForm";

export const Filter = () => {
	const [isChecked, setIsChceked ] =  useState(false)
	const [treatments, setTreatments] = useState([]);
	const [centers, setCenters] = useState([]);
	const [couples, setCouples] = useState([]);
	const [processes, setProcesses] = useState([]);

	const [centersInHTML, setCentersInHTML] = useState([]);
	const [treatmentsInHTML, setTreatmentsInHTML] = useState([]);
	const [couplesInHTML, setCouplesInHTML] = useState([]);
	const [processInHTML, setProcessInHTML] = useState([]);

	const getElements = async (elements, set) => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/${elements}`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json" }
		});
		if (resp.ok) {
			const data = await resp.json();
			set(data);
		}
	};

	useEffect(() => {
		getElements("treatments", setTreatments);
		getElements("centers", setCenters);
		getElements("couples", setCouples);
		getElements("processtimeslots", setProcesses);
		// getUserData(1);
	}, []);

	// const handleUpdateUser = (attr, value) => {
	// 	let new_user = { ...user };
	// 	new_user[attr] = value;
	// 	setUser(new_user);
	// };

	useEffect(
		() => {
			setCentersInHTML(
				centers.map(center => {
					// let isChecked = center.id === user.center_id ? true : false;
					return (
						<SelectOptionForm
							key={`c-${center.id}`}
							colClass="col-12 col-md-4 p-1"
							code={`c-${center.id}`}
							generalName="centers"
							id={center.id}
							// set={handleUpdateUser}
							attr="center_id"
							option={center.type}
							// isChecked={isChecked}
						/>
					);
				})
			);
		},
		[centers]
	);

	useEffect(
		() => {
			setTreatmentsInHTML(
				treatments.map(treatment => {
					// let isChecked = treatment.id === user.treatment_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-12 col-md-4 p-1"
							key={`t-${treatment.id}`}
							code={`t-${treatment.id}`}
							generalName="treatments"
							id={treatment.id}
							// set={handleUpdateUser}
							attr="treatment_id"
							option={treatment.type}
							// isChecked={isChecked}
						/>
					);
				})
			);
		},
		[treatments]
	);

	useEffect(
		() => {
			setCouplesInHTML(
				couples.map(couple => {
					// let isChecked = couple.id === user.couple_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-12 col-md-6 p-1"
							key={`co-${couple.id}`}
							code={`co-${couple.id}`}
							generalName="couples"
							id={couple.id}
							// set={handleUpdateUser}
							attr="couple_id"
							option={couple.option}
							// isChecked={isChecked}
						/>
					);
				})
			);
		},
		[couples]
	);

	useEffect(
		() => {
			setProcessInHTML(
				processes.map(process => {
					let range =
						process.min_value === process.max_value
							? "> 5 años"
							: `${process.min_value} - ${process.max_value} años`;
					// let isChecked = process.id === user.process_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-12 col-md-6 p-1"
							code={`pr-${process.id}`}
							key={`pr-${process.id}`}
							generalName="process"
							id={process.id}
							// set={handleUpdateUser}
							attr="process_id"
							option={range}
							// isChecked={isChecked}
						/>
					);
				})
			);
		},
		[processes]
	);

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white">
					<form>
						<FormTitle title="Filtros" />
						<SelectInput
							label="Edad"
							options={
								<SelectOptionForm
									colClass="col-12 col-md-6 p-1"
									code={`edad`}
									key={`1`}
									generalName="edad"
									id=""
									// set={handleUpdateUser}
									attr="process_id"
									option="Mismo rango de edad"
									// isChecked={isChecked}
								/>
							}
						/>
						<SelectInput
							label="Duelos"
							options={
								<SelectOptionForm
									colClass="col-12 col-md-6 p-1"
									code="duelo"
									key="4"
									generalName="duelo"
									id=""
									// set={handleUpdateUser}
									attr=""
									option="Experiencia similar"
									// isChecked={isChecked}
								/>
							}
						/>
						<SelectInput label="Tratamiento actual" options={treatmentsInHTML} />
						<SelectInput label="Tipo de relación" options={couplesInHTML} />
						<SelectInput label="Tiempo en el proceso" options={processInHTML} />
						<SelectInput label="Centros Clinicos" options={centersInHTML} />

						<div className="row justify-content-center">
							<div className="col text-center">
								{/* <button type="button" className="btn bg-prin" onClick={handleUpdateProfile}>
									Actualizar
								</button> */}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
