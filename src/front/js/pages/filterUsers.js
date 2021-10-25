import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { HashtagProfile } from "../component/hashtagProfile";
import { SelectOptionForm } from "../component/selectOptionForm";

export const FilterUsers = () => {
	const { store, actions } = useContext(Context);

	const [users, setUsers] = useState([]);
	const [usersInHTML, setUsersInHTML] = useState([]);

	const [treatments, setTreatments] = useState([]);
	const [centers, setCenters] = useState([]);
	const [couples, setCouples] = useState([]);
	const [processes, setProcesses] = useState([]);

	const [treatmentsInHTML, setTreatmentsInHTML] = useState([]);
	const [centersInHTML, setCentersInHTML] = useState([]);
	const [couplesInHTML, setCouplesInHTML] = useState([]);
	const [processesInHTML, setProcessesInHTML] = useState([]);

	const [treatmentsSelected, setTreatmentsSelected] = useState([]);
	const [centersSelected, setCentersSelected] = useState([]);
	const [couplesSelected, setCouplesSelected] = useState([]);
	const [processesSelected, setProcessesSelected] = useState([]);

	useEffect(() => {
		actions.getElements("users/show-info", setUsers);
		actions.getElements("treatments", setTreatments);
		actions.getElements("centers", setCenters);
		actions.getElements("couples", setCouples);
		actions.getElements("processtimeslots", setProcesses);
	}, []);

	useEffect(() => {
		buildUsersInHTML(users);
	}, [users]);

	const buildUsersInHTML = users_array => {
		setUsersInHTML(
			users_array.map(user => (
				<div className="card" key={user.user_id}>
					<h5 className="card-header">{user.name}</h5>
					<div className="card-body">
						<p className="card-text text-justify">{prompt.prompt}</p>
						<p className="d-flex flex-wrap justify-content-center">
							{user.age ? <HashtagProfile icon="fas fa-history" text={`${user.age} años`} /> : ""}
							{user.abortion_num ? (
								<HashtagProfile
									icon="fas fa-hand-holding-medical"
									text={`${user.abortion_num} pérdida(s)`}
								/>
							) : (
								""
							)}
							{user.center ? (
								<HashtagProfile icon="fas fa-map-marker" text={`Centro ${user.center}`} />
							) : (
								""
							)}

							{user.process ? (
								<HashtagProfile icon="fas fa-search" text={`${user.process} año(s) en búsqueda`} />
							) : (
								""
							)}

							{user.treatment ? (
								<HashtagProfile icon="fas fa-briefcase-medical" text={user.treatment} />
							) : (
								""
							)}

							{user.couple ? <HashtagProfile icon="fas fa-heart" text={user.couple} /> : ""}
						</p>
					</div>
					<div className="card-footer text-muted">
						<button>Conectar</button> <Link to={`/moreUserInfo/${user.id}`}>Ver más detalles</Link>
					</div>
				</div>
			))
		);
	};

	const handleSelectTreatment = treatment => {
		let index = treatmentsSelected.findIndex(t => t === treatment);
		index !== -1 ? deleteTreatmentSelected(index) : setTreatmentsSelected([...treatmentsSelected, treatment]);
	};

	const deleteTreatmentSelected = index => {
		let treatments = [...treatmentsSelected];
		treatments.splice(index, 1);
		setTreatmentsSelected(treatments);
	};

	useEffect(() => {
		setTreatmentsInHTML(
			treatments.map(treatment => {
				let isChecked = treatmentsSelected.includes(treatment) ? true : false;
				return (
					<SelectOptionForm
						colClass="col-12 col-md-4 p-1"
						key={`t-${treatment.id}`}
						code={`t-${treatment.id}`}
						generalName="treatments"
						id={treatment.id}
						set={() => handleSelectTreatment(treatment)}
						attr="treatment_id"
						option={treatment.type}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [treatments, treatmentsSelected]);

	return (
		<div className="container">
			<h1>Favorite Prompts</h1>
			<div className="row p-4">
				<div className="col d-flex justify-content-center">{treatmentsInHTML}</div>
			</div>
			<div className="row">
				<div className="col card-columns">{usersInHTML} </div>
			</div>
		</div>
	);
};
