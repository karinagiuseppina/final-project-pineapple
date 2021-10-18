import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

export const Card = ({ result }) => {
	return (
		<div className="card">
			<img src="..." className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">{result.name}</h5>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Edad: {result.age}</li>
					<li className="list-group-item">
						Busqueda:
						{result.process_id}
						años
					</li>
					<li className="list-group-item">{result.treatment_id}</li>
					<li className="list-group-item">{result.couple_id}</li>
					<li className="list-group-item">{result.center_id}</li>
					<li className="list-group-item">{result.abortion_num}</li>
				</ul>
				<button>contactar</button>
				<Link to={"/profile/{result.id}"}>
					<button>mas info</button>
				</Link>
			</div>
		</div>
	);
};

Card.propTypes = {
	result: propTypes.object
};
