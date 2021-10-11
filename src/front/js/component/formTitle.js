import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const FormTitle = ({ title }) => {
	return <h4 className="py-2 text-prin">{title}</h4>;
};

FormTitle.propTypes = {
	title: PropTypes.string
};
