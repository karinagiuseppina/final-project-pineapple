import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const ButtonType = ({ type, value, onClick }) => {
	return (
		<button
			className="btn button-primary m-auto"
			type={type}
			value={value}
			onClick={onClick !== undefined ? onClick : null}>
			{value}
		</button>
	);
};

ButtonType.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	onClick: PropTypes.func
};
