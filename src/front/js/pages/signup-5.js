import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

export const Signup5 = () => {
	const [numAbortos, SetNumAbortos] = useState("");
	let History = useHistory();

	function updateInfo(event) {
		event.preventDefault();
		const userId = localStorage.getItem("userid");

		fetch("https://3001-jade-peacock-yxhi82yd.ws-eu18.gitpod.io/api/update-abortion", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				abortion_num: numAbortos,
				user_id: userId
			})
		});
		History.push("/signup-6");
	}

	return (
		<div className="text-center mt-5">
			<h1>¿Has sufrido alguna perdida?</h1>

			<form onSubmit={updateInfo}>
				<label>numero</label>
				<input type="number" onChange={event => SetNumAbortos(event.target.value)} />
				<input type="submit" value="Siguiente" />
				<Link to={"/list-of-women"}>
					<button>Saltar Cuestonario</button>{" "}
				</Link>
			</form>

			{/* <progress id="file" max="100" value="40">
				{" "}
				40%{" "}
			</progress> */}
			<ProgressBar now={40} />
		</div>
	);
};
