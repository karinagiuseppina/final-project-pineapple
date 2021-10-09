import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import { FormTitle } from "./formTitle";

export const SelectInput = ({ label, options }) => {
	return (
		<div className="row p-2">
			<div className="col">
				<FormTitle title={label} />
				<div className="row">{options}</div>
			</div>
		</div>
	);
};

SelectInput.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array
};
