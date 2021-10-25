import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import { oneOfType } from "prop-types";

export const NormalInput = ({ type, placeholder, set, value, icon, attr, required }) => {
	return (
		<div className="input">
			<label>{placeholder}</label>
			<input
				type={type}
				// placeholder={placeholder}
				value={value}
				onChange={e => (attr === undefined ? set(e.target.value) : set(attr, e.target.value))}
				required={required === undefined ? false : true}
			/>
			{/* <div className="input-icon">
				<i className={icon} />
			</div> */}
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
