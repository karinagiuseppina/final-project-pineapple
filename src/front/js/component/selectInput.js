import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";
import { FormTitle } from "./formTitle";

export const SelectInput = ({ label, options }) => {
	return (
		<div className="row p-2">
			<FormTitle title={label} />
			{options}
		</div>
	);
};

SelectInput.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array
};
