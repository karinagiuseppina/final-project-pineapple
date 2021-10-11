import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const Signup6 = () => {
	let History = useHistory();
	const [coupleOPtions, setCoupleOPtions] = useState([]);
	const [coupleid, setCoupleid] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/couples", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			});
			const data = await res.json();
			console.log(data);
			setCoupleOPtions(data);
		})();
	}, []);
	const optionHtml = coupleOPtions.map(function(couple) {
		return (
			<option key={couple.id} value={couple.id}>
				{couple.option}
			</option>
		);
	});

	async function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("userid");
		console.log("couple id" + coupleid);
		await fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/update-couple", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				couple_id: coupleid,
				user_id: userId
			})
		});
		History.push("/signup-7");
	}

	return (
		<div className="text-couple mt-5">
			<h1>¿Tienes una relacion?</h1>
			<form onSubmit={updateInfo}>
				<select name="tiempo_proceso" onChange={event => setCoupleid(event.target.value)}>
					{optionHtml}
				</select>
				<input type="submit" value="Siguiente" />
				<Link to={"signup-5"}>
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
