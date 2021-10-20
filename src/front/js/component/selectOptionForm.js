import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const SelectOptionForm = ({ colClass, code, generalName, id, set, option, isChecked, attr }) => {
	return (
		<div className={colClass}>
			<input
				id={code}
				type="radio"
				name={generalName}
				value={id}
				onChange={() => (attr === undefined ? set(id) : set(attr, id))}
				checked={isChecked}
			/>
			<label htmlFor={code}>{option} </label>
		</div>
	);
};

SelectOptionForm.propTypes = {
	code: PropTypes.string,
	option: PropTypes.string,
	generalName: PropTypes.string,
	set: PropTypes.func,
	id: PropTypes.number,
	colClass: PropTypes.string,
	isChecked: PropTypes.bool,
	attr: PropTypes.string
};
