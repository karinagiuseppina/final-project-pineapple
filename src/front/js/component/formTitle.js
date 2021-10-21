import React from "react";
import "../../styles/home.scss";
import PropTypes from "prop-types";

export const FormTitle = ({ title }) => {
	return <h6 className="py-2 text-prin formTitle">{title}</h6>;
};

FormTitle.propTypes = {
	title: PropTypes.string
};
