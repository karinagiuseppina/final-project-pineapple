import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { SelectInput } from "../component/selectInput";
import { NormalInput } from "../component/normalInput";
import { FormTitle } from "../component/formTitle";
import { SelectOptionForm } from "../component/selectOptionForm";

export const EditProfile = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({
		user_id: -1,
		name: "",
		email: "",
		age: 0,
		abortion_num: 0,
		description: "",
		treatment_id: -1,
		process_id: -1,
		couple_id: -1,
		center_id: -1,
		profile_img: null
	});

	const [file, setFile] = useState([]);
	const [treatments, setTreatments] = useState([]);
	const [centers, setCenters] = useState([]);
	const [couples, setCouples] = useState([]);
	const [processes, setProcesses] = useState([]);

	const [centersInHTML, setCentersInHTML] = useState([]);
	const [treatmentsInHTML, setTreatmentsInHTML] = useState([]);
	const [couplesInHTML, setCouplesInHTML] = useState([]);
	const [processInHTML, setProcessInHTML] = useState([]);

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
		setUser({
			user_id: user.id,
			name: user.name,
			email: user.email,
			age: user.age,
			abortion_num: user.abortion_num || "",
			description: user.description ? user.description : "",
			treatment_id: user.treatment_id,
			process_id: user.process_id,
			couple_id: user.couple_id,
			center_id: user.center_id
		});
	};

	const save_data = () => {
		if (file.length === 0) {
			updateProfile(
				user.user_id,
				user.age,
				user.name,
				user.password,
				user.email,
				user.treatment_id,
				user.process_id,
				user.couple_id,
				user.center_id,
				user.description
			);
		} else save_profile_img();
	};

	const save_profile_img = async () => {
		let data = new FormData();
		data.append("file", file[0]);
		let resp = await fetch(`${process.env.BACKEND_URL}/api/upload-file`, {
			method: "PUT",
			headers: { Authorization: "Bearer " + store.access_token },
			body: data
		});
		if (resp.ok) {
			const profile_image_url = await resp.json();
			handleUpdateUser("profile_img", profile_image_url.profile_image);
			updateProfile(
				user.user_id,
				user.age,
				user.name,
				user.password,
				user.email,
				user.treatment_id,
				user.process_id,
				user.couple_id,
				user.center_id,
				user.description,
				profile_image_url.profile_image
			);
		} else {
			alert("ERROR");
		}
	};

	const updateProfile = async (
		user_id,
		age,
		name,
		password,
		email,
		treatment_id,
		process_id,
		couple_id,
		center_id,
		description,
		profile_image_url
	) => {
		let profile_pic = profile_image_url ? profile_image_url : null;
		const resp = await fetch(`${process.env.BACKEND_URL}/api/editProfile`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token },
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
				description: description,
				profile_img: profile_pic
			})
		});
		if (resp.ok) {
			const data = await resp.json();
		}
	};

	useEffect(() => {
		// setTreatments(store.treatments);
		// setCenters(store.centers);
		// setCouples(store.couples);
		// setProcesses(store.processes);
		actions.getElements("treatments", setTreatments);
		actions.getElements("centers", setCenters);
		actions.getElements("couples", setCouples);
		actions.getElements("processtimeslots", setProcesses);
		getUserData(store.user_id);
	}, []);

	const handleUpdateUser = (attr, value) => {
		let new_user = { ...user };
		new_user[attr] = value;
		setUser(new_user);
	};

	useEffect(() => {
		setCentersInHTML(
			centers.map(center => {
				let isChecked = center.id === user.center_id ? true : false;
				return (
					<SelectOptionForm
						key={`c-${center.id}`}
						colClass="col-12 col-md-4 p-1"
						code={`c-${center.id}`}
						generalName="centers"
						id={center.id}
						set={handleUpdateUser}
						attr="center_id"
						option={center.type}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [centers, user]);

	useEffect(() => {
		setTreatmentsInHTML(
			treatments.map(treatment => {
				let isChecked = treatment.id === user.treatment_id ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-4 p-1"
						key={`t-${treatment.id}`}
						code={`t-${treatment.id}`}
						generalName="treatments"
						id={treatment.id}
						set={handleUpdateUser}
						attr="treatment_id"
						option={treatment.type}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [treatments, user]);

	useEffect(() => {
		setCouplesInHTML(
			couples.map(couple => {
				let isChecked = couple.id === user.couple_id ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-6 p-1"
						key={`co-${couple.id}`}
						code={`co-${couple.id}`}
						generalName="couples"
						id={couple.id}
						set={handleUpdateUser}
						attr="couple_id"
						option={couple.option}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [couples, user]);

	useEffect(() => {
		setProcessInHTML(
			processes.map(process => {
				let range =
					process.min_value === process.max_value
						? "> 5 años"
						: `${process.min_value} - ${process.max_value} años`;
				let isChecked = process.id === user.process_id ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-6 p-1"
						code={`pr-${process.id}`}
						key={`pr-${process.id}`}
						generalName="process"
						id={process.id}
						set={handleUpdateUser}
						attr="process_id"
						option={range}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [processes, user]);

	return (
		<div className="container-fluid bg-lightgray p-4">
			<div className="row justify-content-center">
				<div className="col-11 col-md-6 m-1 p-4 border border-lightgray rounded bg-white">
					<form>
						<div className="row justify-content-center">
							<div className="col">
								<FormTitle title="Datos Generales" />
								<input type="file" onChange={e => setFile(e.target.files)} />
								<NormalInput
									type="text"
									placeholder="Nombre"
									value={user.name}
									set={handleUpdateUser}
									attr="name"
									icon="fa fa-user"
								/>
								<NormalInput
									type="email"
									placeholder="example@example.com"
									value={user.email}
									set={handleUpdateUser}
									attr="email"
									icon="fa fa-envelope"
								/>
								<NormalInput
									type="password"
									placeholder="Contraseña"
									value={user.password}
									set={handleUpdateUser}
									attr="password"
									icon="fas fa-key"
								/>
							</div>
						</div>

						<div className="row justify-content-center">
							<div className="col-12 col-md-6">
								<FormTitle title="Edad" />
								<NormalInput
									type="number"
									value={user.age}
									set={handleUpdateUser}
									attr="age"
									icon="fas fa-calendar-check"
								/>
							</div>
							<div className="col-12 col-md-6">
								<FormTitle title="Número de abortos" />
								<NormalInput
									type="number"
									value={user.abortion_num}
									set={handleUpdateUser}
									attr="abortion_num"
									icon="fas fa-calendar-check"
								/>
							</div>
						</div>
						<SelectInput label="Centro" options={centersInHTML} />
						<SelectInput label="Tratamiento actual" options={treatmentsInHTML} />
						<SelectInput label="Tipo de relación" options={couplesInHTML} />
						<SelectInput label="Tiempo en el proceso" options={processInHTML} />
						<div className="row justify-content-center">
							<div className="col">
								<FormTitle title="Más detalles" />
								<div className="input-group">
									<textarea
										className="form-control bg-lightgray"
										value={user.description}
										onChange={e => handleUpdateUser("description", e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col text-center">
								<button type="button" className="btn bg-prin" onClick={save_data}>
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
