import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="card">
				<img src="..." className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Carlota</h5>
					<p>
						Descripcion mas detallada de su experiencia, Lorem Ipsum is simply dummy text of the printing
						and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the
						1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
						book. It has survived not only five centuries, but also the leap into electronic
					</p>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Edad: 35</li>
						<li className="list-group-item">Busqueda: 3 años</li>
						<li className="list-group-item">fiv , ISIC, IA</li>
						<li className="list-group-item">En una relacion con una mujer</li>
						<li className="list-group-item">CentrosPrivado - Publico</li>
						<li className="list-group-item">1 perdida</li>
					</ul>
					<button>contactar</button>
					<Link to={"/list-of-women"}>
						<button>volver a la lista</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
