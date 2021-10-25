import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ChatMessage = ({ chatAlign, text, time }) => {
	return (
		<li className={chatAlign}>
			<div className="chat-text">{text}</div>
			<div className="chat-hour">{time}</div>
		</li>
	);
};

ChatMessage.propTypes = {
	chatAlign: PropTypes.string,
	text: PropTypes.string,
	time: PropTypes.string
};
