import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import { oneOfType } from "prop-types";

export const NormalInputPassword = ({ type, placeholder, set, value, icon, attr, required, click }) => {
	return (
		<div className="col-auto">
			{placeholder !== "" ? <label>{placeholder}</label> : ""}
			<div className="input-group">
				<input
					type={type}
					className="form-control"
					id="inlineFormInputGroup"
					value={value}
					onChange={e => (attr === undefined ? set(e.target.value) : set(attr, e.target.value))}
					required={required === undefined ? false : true}
				/>
				<div className="input-group-prepend">
					<div className="input-group-text" onClick={click}>
						{icon}
					</div>
				</div>
			</div>
		</div>
	);
};

NormalInputPassword.propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	value: oneOfType([PropTypes.string, PropTypes.number]),
	set: PropTypes.func,
	icon: PropTypes.element,
	attr: PropTypes.string,
	required: PropTypes.bool,
	click: PropTypes.func
};
