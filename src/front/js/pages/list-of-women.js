import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ListOfWomen = () => {
	return (
		<div className="row row-cols-1 row-cols-md-3 g-4">
			<div className="col">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Carlota</h5>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Edad: 35</li>
							<li className="list-group-item">Busqueda: 3 años</li>
							<li className="list-group-item">fiv , ISIC, IA</li>
							<li className="list-group-item">En una relacion con una mujer</li>
							<li className="list-group-item">CentrosPrivado - Publico</li>
							<li className="list-group-item">1 perdida</li>
						</ul>
						<button>contactar</button>
						<Link to={"/usermoreinfo/1"}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Carlota</h5>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Edad: 35</li>
							<li className="list-group-item">Busqueda: 3 años</li>
							<li className="list-group-item">fiv , ISIC, IA</li>
							<li className="list-group-item">En una relacion con una mujer</li>
							<li className="list-group-item">CentrosPrivado - Publico</li>
							<li className="list-group-item">1 perdida</li>
						</ul>
						<button>contactar</button>
						<Link to={"/profile"}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Carlota</h5>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Edad: 35</li>
							<li className="list-group-item">Busqueda: 3 años</li>
							<li className="list-group-item">fiv , ISIC, IA</li>
							<li className="list-group-item">En una relacion con una mujer</li>
							<li className="list-group-item">CentrosPrivado - Publico</li>
							<li className="list-group-item">1 perdida</li>
						</ul>
						<button>contactar</button>
						<Link to={"/profile"}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Carlota</h5>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Edad: 35</li>
							<li className="list-group-item">Busqueda: 3 años</li>
							<li className="list-group-item">fiv , ISIC, IA</li>
							<li className="list-group-item">En una relacion con una mujer</li>
							<li className="list-group-item">CentrosPrivado - Publico</li>
							<li className="list-group-item">1 perdida</li>
						</ul>
						<button>contactar</button>
						<Link to={"/profile"}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="card">
					<img src="..." className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">Carlota</h5>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">Edad: 35</li>
							<li className="list-group-item">Busqueda: 3 años</li>
							<li className="list-group-item">fiv , ISIC, IA</li>
							<li className="list-group-item">En una relacion con una mujer</li>
							<li className="list-group-item">CentrosPrivado - Publico</li>
							<li className="list-group-item">1 perdida</li>
						</ul>
						<button>contactar</button>
						<Link to={"/profile"}>
							<button>mas info</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
