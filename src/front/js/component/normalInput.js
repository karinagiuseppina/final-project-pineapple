import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import { oneOfType } from "prop-types";

export const NormalInput = ({ type, placeholder, set, value, attr, required }) => {
	return (
		<div className="input">
			<label>{placeholder}</label>
			<input
				type={type}
				value={value}
				onChange={e => (attr === undefined ? set(e.target.value) : set(attr, e.target.value))}
				required={required === undefined ? false : true}
			/>
		</div>
	);
};

NormalInput.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: oneOfType([PropTypes.string, PropTypes.number]),
	set: PropTypes.func,
	icon: PropTypes.string,
	attr: PropTypes.string,
	required: PropTypes.bool
};
