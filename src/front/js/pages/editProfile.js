import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { SelectInput } from "../component/selectInput";
import { NormalInput } from "../component/normalInput";
import { FormTitle } from "../component/formTitle";
import { SelectOptionForm } from "../component/selectOptionForm";
import { NormalInputPassword } from "../component/normalInputPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ButtonType } from "../component/buttonType";

export const EditProfile = () => {
	const { store, actions } = useContext(Context);
	const [passwordShown, setPasswordShown] = useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const [user, setUser] = useState({
		user_id: -1,
		name: "",
		email: "",
		age: 0,
		password: "",
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
			password: "",
			age: user.age,
			abortion_num: user.abortion_num ? user.abortion_num : 0,
			description: user.description ? user.description : "",
			treatment_id: user.treatment_id,
			process_id: user.process_id,
			couple_id: user.couple_id,
			center_id: user.center_id
		});
	};

	const save_data = () => {
		if (file.length === 0) {
			updateProfile(null);
		} else save_profile_img();
	};

	const save_profile_img = async () => {
		let token = actions.getAccessToken();
		let data = new FormData();
		data.append("file", file[0]);
		let resp = await fetch(`${process.env.BACKEND_URL}/api/upload-file`, {
			method: "PUT",
			headers: { Authorization: "Bearer " + token },
			body: data
		});
		if (resp.ok) {
			const profile_image_url = await resp.json();
			handleUpdateUser("profile_img", profile_image_url.profile_image);
			updateProfile(profile_image_url.profile_image);
		} else if (resp.status === 401 || resp.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else save_profile_img();
		}
	};

	const updateProfile = async profile_image_url => {
		let profile_pic = profile_image_url ? profile_image_url : null;
		let token = actions.getAccessToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/editProfile`, {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
			body: JSON.stringify({
				user_id: user.user_id,
				age: user.age,
				name: user.name,
				password: user.password,
				email: user.email,
				abortion_num: user.abortion_num,
				treatment_id: user.treatment_id,
				process_id: user.process_id,
				couple_id: user.couple_id,
				center_id: user.center_id,
				description: user.description,
				profile_img: profile_pic
			})
		});
		if (resp.ok) {
			const data = await resp.json();
			actions.notificationAlert(
				"Perfil Actualizado!",
				"Tu perfil se ha actualizado correctamente. ",
				"success",
				"cerrar"
			);
		} else if (resp.status === 401 || resp.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else updateProfile();
		} else {
			actions.notificationAlert(
				"0H, OH!",
				"Ha habido un error, no hemos podido actualizar los datos",
				"warning",
				"cerrar"
			);
		}
	};

	useEffect(() => {
		actions.getElements("treatments", setTreatments);
		actions.getElements("centers", setCenters);
		actions.getElements("couples", setCouples);
		actions.getElements("processtimeslots", setProcesses);
		getUserData(actions.getUserId());
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
						colClass={center.id == 3 ? "col-12 p-1" : "col-6 p-1"}
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
						colClass={treatment.id == 3 ? "col-12 p-1" : "col-6 p-1"}
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
						colClass="col-6 p-1"
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
						colClass="col-6 p-1"
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
		<div className="App-box">
			<form>
				<div className="row justify-content-center p-2">
					<div className="col">
						<h1>Datos Generales</h1>
						<input type="file" onChange={e => setFile(e.target.files)} />
						<FormTitle title="Nombre" />
						<NormalInput type="text" value={user.name} set={handleUpdateUser} attr="name" />
						<FormTitle title="email" />
						<NormalInput type="email" value={user.email} set={handleUpdateUser} attr="email" />
						<FormTitle title="Nueva contarseña" />
						<NormalInputPassword
							type={passwordShown ? "text" : "password"}
							placeholder=""
							value={user.password}
							set={handleUpdateUser}
							attr="password"
							required={true}
							click={togglePasswordVisiblity}
							icon={<FontAwesomeIcon icon={faEye} />}
						/>
						<FormTitle title="Tu experiencia" />
						<div className="input-group">
							<textarea
								className="form-control"
								value={user.description}
								onChange={e => handleUpdateUser("description", e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className="col-12" />
				<h1>Sobre tu camino</h1>
				<div className="row row-questions p-2">
					<div className="col-6 p-1">
						<FormTitle title="Edad" />
						<NormalInput type="number" value={user.age} set={handleUpdateUser} attr="age" />
					</div>
					<div className="col-6 p-1">
						<FormTitle title="Muerte gestacional" />
						<NormalInput
							type="number"
							value={user.abortion_num}
							set={handleUpdateUser}
							attr="abortion_num"
						/>
					</div>
				</div>
				<SelectInput label="Tiempo en el proceso" options={processInHTML} />
				<SelectInput label="Tipo de relación" options={couplesInHTML} />
				<SelectInput label="Centro" options={centersInHTML} />
				<SelectInput label="Tratamiento actual" options={treatmentsInHTML} />

				<div className="row">
					<div className="col-12 col-md-6">
						<ButtonType classN="button primary" type="button" value="Guardar" onClick={save_data} />
					</div>
					<div className="col-12 col-md-6">
						<Link to={"/profile"}>
							<ButtonType classN="button secondary" type="submit" value="Ver perfil" />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
