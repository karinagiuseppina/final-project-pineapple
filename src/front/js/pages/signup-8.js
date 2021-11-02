import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import { ButtonType } from "../component/buttonType";
import { SelectOptionForm } from "../component/selectOptionForm";
import { Context } from "../store/appContext";

export const Signup8 = () => {
	let history = useHistory();
	const [centers, setCenters] = useState([]);
	const [centerid, setCenterid] = useState("");
	const [centersInHTML, setCentersInHTML] = useState([]);
	const { store, actions } = useContext(Context);
	const [oneTimeNotification, setOneTimeNotification] = useState(0);

	useEffect(() => {
		actions.getElements("centers", setCenters);
	}, []);
	useEffect(() => {
		setCentersInHTML(
			centers.map(center => {
				let isChecked = center.id === centerid ? true : false;
				return (
					<SelectOptionForm
						colClass={center.id == 3 ? "col-12 p-1" : "col-6 p-1"}
						code={`t-${center.id}`}
						key={`t-${center.id}`}
						generalName="center"
						id={center.id}
						set={setCenterid}
						option={center.type}
						isChecked={isChecked}
					/>
				);
			})
		);
	}, [centers, centerid]);

	async function updateInfo(event) {
		event.preventDefault();
		if ((oneTimeNotification == 0) & (centerid == "")) {
			actions.notificationAlert("Ups", "Puede que hayas olvidado elegir una opción", "question", "cerrar");
			setOneTimeNotification(1);
		} else if ((oneTimeNotification == 1) & (centerid == "")) {
			history.push("/list-of-women");
		} else {
			const userId = localStorage.getItem("user_id");
			await fetch(`${process.env.BACKEND_URL}/api/update-center`, {
				method: "PUT",
				headers: { "Content-Type": "application/json", Authorization: "Bearer " + store.access_token },
				body: JSON.stringify({
					center_id: centerid,
					user_id: userId
				})
			});
			history.push("/list-of-women");
		}
	}

	return (
		<div className="App-box">
			<div className="signup-header">
				<h1 className="question-text">¿A que centros has acudido?</h1>
				<div className="image-box">
					<img className="piña-partida-sinnombre" src={pinaPartidaNombre} alt="dibujo piña partida" />
				</div>
			</div>
			<form onSubmit={updateInfo}>
				<div className="row">{centersInHTML}</div>
				<div className="row">
					<div className="col-12 col-md-4">
						<ButtonType classN="button primary" type="submit" value="Tu media piña" />
					</div>
					<div className="col-12 col-md-4">
						<Link to={"/profile"}>
							<ButtonType classN="button secondary" type="button" value="Mi Perfil" />
						</Link>
					</div>
				</div>
			</form>

			{/* <ProgressBar now={20} /> */}
		</div>
	);
};
