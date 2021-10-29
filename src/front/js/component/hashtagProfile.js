import React from "react";
import PropTypes from "prop-types";

export const HashtagProfile = ({ text, icon }) => {
	return <div className="border-orange p-2 m-1 text-uppercase rounded text-prin font-size-small">{text}</div>;
};

HashtagProfile.propTypes = {
	icon: PropTypes.string,
	text: PropTypes.string
};
