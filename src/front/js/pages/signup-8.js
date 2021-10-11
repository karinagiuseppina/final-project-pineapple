import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const Signup8 = () => {
	let History = useHistory();
	const [centers, setCenters] = useState([]);
	const [centerid, setCenterid] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/centers", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			console.log(data);
			setCenters(data);
		})();
	}, []);
	const optionHtml = centers.map(function(center) {
		return (
			<option key={center.id} value={center.id}>
				{center.type}
			</option>
		);
	});

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("userid");
		console.log("center id" + centerid);
		await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/update-center", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				center_id: centerid,
				user_id: userId
			})
		});
		History.push("/list-of-women");
	}

	return (
		<div className="text-center mt-5">
			<h1>¿A que centros has acudido?</h1>
			<form onSubmit={updateInfo}>
				<select name="tiempo_proceso" onChange={event => setCenterid(event.target.value)}>
					{optionHtml}
				</select>
				<input type="submit" value="Siguiente" />
				<Link to={"/list-of-women"}>
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
