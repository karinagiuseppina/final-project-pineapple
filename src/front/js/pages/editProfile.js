import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import { Link } from "react-router-dom";
import { SelectInput } from "../component/selectInput";
import { NormalInput } from "../component/normalInput";

export const EditProfile = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
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

	const updateProfile = async () => {
		let user = {
			name: name,
			password: password,
			email: email,
			treatment_id: treatment_id,
			process_id: process_id,
			couple_id: couple_id,
			center_id: center_id,
			description: description
		};
		console.log(user);
		const resp = await fetch(`${process.env.BACKEND_URL}/api/editProfile`, {
			method: "PUT",
			headers: { "Content-Type": "applicacion/json" },
			body: user
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
	}, []);

	useEffect(
		() => {
			setCentersInHTML(
				centers.map(center => {
					return (
						<option value={center.id} key={center.id}>
							{center.type}
						</option>
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
					return (
						<option value={treatment.id} key={treatment.id}>
							{treatment.type}
						</option>
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
					return (
						<option value={couple.id} key={couple.id}>
							{couple.option}
						</option>
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
					return (
						<option value={process.id} key={process.id}>
							{process.min_value} - {process.max_value}
						</option>
					);
				})
			);
		},
		[processes]
	);

	return (
		<div className="container">
			<h1>Editar mi perfil</h1>
			<div className="row justify-content-center">
				<div className="col-6">
					<form>
						<NormalInput
							label="Name"
							type="text"
							placeholder="Introduce tu nombre aquí."
							set={setName}
							value={name}
						/>
						<NormalInput
							label="Email"
							type="email"
							placeholder="name@example.com"
							set={setEmail}
							value={email}
						/>
						<NormalInput
							label="Contraseña"
							type={vissiblePassword}
							placeholder=""
							set={setPassword}
							value={password}
						/>

						<div className="form-group">
							<label>Details of</label>
							<input
								type="file"
								className="form-control-file"
								onChange={e => console.log(e.target.value)}
							/>
						</div>

						<SelectInput label="Centers" value={center_id} set={setCenter_id} options={centersInHTML} />
						<SelectInput label="Couple" value={couple_id} set={setCouple_id} options={couplesInHTML} />
						<SelectInput
							label="Treatment"
							value={treatment_id}
							set={setTreatment_id}
							options={treatmentsInHTML}
						/>
						<SelectInput
							label="Time in Process"
							value={process_id}
							set={setProcess_id}
							options={processInHTML}
						/>

						<div className="form-group">
							<label>Descripción</label>
							<textarea
								className="form-control"
								rows="3"
								onChange={e => setDescription(e.target.value)}
								value={description}
							/>
						</div>
					</form>
					<button onClick={updateProfile}>Send</button>
				</div>
			</div>
		</div>
	);
};
