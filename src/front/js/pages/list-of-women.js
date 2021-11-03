import React, { useContext, useState, useEffect } from "react";
import "../../styles/home.scss";
import { Card } from "../component/card";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Swiper, SwiperSlide } from "swiper/react";

export const ListOfWomen = () => {
	const { store, actions } = useContext(Context);
	const [waiting, setwaiting] = useState(0);
	const [results, setResults] = useState([]);
	const [resultsInHTML, setResultsInHTML] = useState([]);

	useEffect(() => {
		getPossibleMatches();
	}, []);

	const getPossibleMatches = async () => {
		let token = actions.getAccessToken();
		const res = await fetch(`${process.env.BACKEND_URL}/api/findpossiblematches`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }
		});
		if (res.ok) {
			const data = await res.json();
			setResults(data);
			setwaiting(waiting + 1);
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else getPossibleMatches();
		}
	};

	const deleteElementFromList = id => {
		let index = results.findIndex(user => id === user.id);
		if (index !== -1) {
			let old = [...results];
			old.splice(index, 1);
			setResults(old);
		}
	};

	useEffect(() => {
		setResultsInHTML(
			results.map((result, i) => {
				return (
					<SwiperSlide key={i}>
						<Card result={result} deleteElementFromList={deleteElementFromList} />
					</SwiperSlide>
				);
			})
		);
	}, [results]);

	if (waiting === 0) {
		return (
			<div className="loading show">
				<div className="spin"></div>
			</div>
		);
	} else if (waiting == 1) {
		if (results.length == 0) {
			return (
				<div className="box-notfound">
					<p>Tu media piña aun esta madurando ¡Intenta más tarde!</p>
				</div>
			);
		} else {
			return (
				<div className="swiper-container">
					<Swiper
						slidesPerView={"auto"}
						centeredSlides={true}
						spaceBetween={30}
						grabCursor={true}
						className="mySwiper">
						{resultsInHTML}
					</Swiper>
				</div>
			);
		}
	}
};
