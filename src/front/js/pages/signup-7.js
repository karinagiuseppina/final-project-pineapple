import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const Signup7 = () => {
	let History = useHistory();
	const [treatments, setTreatments] = useState([]);
	const [treatmentid, setTreatmentid] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/treatments", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			console.log(data);
			setTreatments(data);
		})();
	}, []);
	const optionHtml = treatments.map(function(treatment) {
		return (
			<option key={treatment.id} value={treatment.id}>
				{treatment.type}
			</option>
		);
	});

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("userid");
		console.log("treatment id" + treatmentid);
		await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/update-treatment", {
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
		<div className="text-center mt-5">
			<h1>¿Que tratamiento estas siguendo?</h1>
			<form onSubmit={updateInfo}>
				<select name="tiempo_proceso" onChange={event => setTreatmentid(event.target.value)}>
					{optionHtml}
				</select>
				<input type="submit" value="Siguiente" />
				<Link to={"signup-8"}>
					<button>Saltar</button>{" "}
				</Link>
			</form>
			{/* <progress id="file" max="100" value="20">
				{" "}
				20%{" "}
			</progress> */}
			<ProgressBar now={20} />
		</div>
	);
};
