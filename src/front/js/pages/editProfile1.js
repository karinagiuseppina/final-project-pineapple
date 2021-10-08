import React, { useEffect, useState } from "react";
import "../../styles/home.scss";
import { SelectInput } from "../component/selectInput";
import { NormalInput } from "../component/normalInput";
import { FormTitle } from "../component/formTitle";
import { SelectOptionForm } from "../component/selectOptionForm";

export const EditProfile1 = () => {
	const [user_id, setUser_id] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState(0);
	const [abortion_num, setAbortion_num] = useState(0);
	const [description, setDescription] = useState("");
	const [treatment_id, setTreatment_id] = useState(-1);
	const [process_id, setProcess_id] = useState(-1);
	const [couple_id, setCouple_id] = useState(-1);
	const [center_id, setCenter_id] = useState(-1);
	const [vissiblePassword, setVissiblePassword] = useState("password");

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
	const getUserData = async id => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json" }
		});
		if (resp.ok) {
			const user_data = await resp.json();
			setOldValues(user_data);
		}
	};
	const setOldValues = user => {
		setAbortion_num(user.abortion_num);
		setAge(user.age);
		setCenter_id(user.center_id);
		setCouple_id(user.couple_id);
		setDescription(user.description ? user.description : "");
		setEmail(user.email);
		setName(user.name);
		setProcess_id(user.process_id);
		setTreatment_id(user.treatment_id);
		setUser_id(user.id);
	};

	const updateProfile = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/editProfile`, {
			method: "PUT",
			headers: { "Content-Type": "applicacion/json" },
			body: JSON.stringify({
				user_id: user_id,
				age: age,
				name: name,
				password: password,
				email: email,
				treatment_id: treatment_id,
				process_id: process_id,
				couple_id: couple_id,
				center_id: center_id,
				description: description
			})
		});
		if (resp.ok) {
			const data = await resp.json();
			console.log("saved!");
		}
	};
	useEffect(() => {
		getElements("treatments", setTreatments);
		getElements("centers", setCenters);
		getElements("couples", setCouples);
		getElements("processtimeslots", setProcesses);
		getUserData(1);
	}, []);

	useEffect(
		() => {
			setCentersInHTML(
				centers.map(center => {
					let isChecked = center.id === center_id ? true : false;
					return (
						<SelectOptionForm
							key={`c-${center.id}`}
							colClass="col-4 p-1"
							code={`c-${center.id}`}
							generalName="centers"
							id={center.id}
							set={setCenter_id}
							option={center.type}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[centers, center_id]
	);

	useEffect(
		() => {
			setTreatmentsInHTML(
				treatments.map(treatment => {
					let isChecked = treatment.id === treatment_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-4 p-1"
							key={`t-${treatment.id}`}
							code={`t-${treatment.id}`}
							generalName="treatments"
							id={treatment.id}
							set={setTreatment_id}
							option={treatment.type}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[treatments, treatment_id]
	);

	useEffect(
		() => {
			setCouplesInHTML(
				couples.map(couple => {
					let isChecked = couple.id === couple_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-6 p-1"
							key={`co-${couple.id}`}
							code={`co-${couple.id}`}
							generalName="couples"
							id={couple.id}
							set={setCouple_id}
							option={couple.option}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[couples, couple_id]
	);

	useEffect(
		() => {
			setProcessInHTML(
				processes.map(process => {
					let range =
						process.min_value === process.max_value
							? "> 5 años"
							: `${process.min_value} - ${process.max_value} años`;
					let isChecked = process.id === process_id ? true : false;
					return (
						<SelectOptionForm
							colClass="col-6 p-1"
							code={`pr-${process.id}`}
							key={`pr-${process.id}`}
							generalName="process"
							id={process.id}
							set={setProcess_id}
							option={range}
							isChecked={isChecked}
						/>
					);
				})
			);
		},
		[processes, process_id]
	);

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-6 m-1 p-4 border border-lightgray rounded bg-white">
					<form>
						<div className="row">
							<div className="col">
								<FormTitle title="Datos Generales" />
								<NormalInput
									type="text"
									placeholder="Nombre"
									value={name}
									set={setName}
									icon="fa fa-user"
								/>
								<NormalInput
									type="email"
									placeholder="example@example.com"
									value={email}
									set={setEmail}
									icon="fa fa-envelope"
								/>
								<NormalInput
									type={vissiblePassword}
									placeholder="Contraseña"
									value={password}
									set={setPassword}
									icon="fa fa-key"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<FormTitle title="Edad" />
								<NormalInput type="number" value={age} set={setAge} icon="fas fa-calendar-check" />
							</div>
							<div className="col-6">
								<FormTitle title="Número de abortos" />
								<NormalInput
									type="number"
									value={abortion_num}
									set={setAbortion_num}
									icon="fas fa-calendar-check"
								/>
							</div>
						</div>
						<SelectInput label="Centro" options={centersInHTML} />
						<SelectInput label="Tratamiento actual" options={treatmentsInHTML} />
						<SelectInput label="Tipo de relación" options={couplesInHTML} />
						<SelectInput label="Tiempo en el proceso" options={processInHTML} />
						<div className="row">
							<div className="col">
								<FormTitle title="Más detalles" />
								<div className="input-group">
									<textarea
										className="form-control bg-lightgray"
										value={description}
										onChange={e => setDescription(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-2">
								<button type="button" className="btn bg-prin" onClick={updateProfile}>
									Actualizar
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
