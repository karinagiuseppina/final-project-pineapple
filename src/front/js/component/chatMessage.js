import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ChatMessage = ({ chatAlign, text, time, date }) => {
	return (
		<li className={chatAlign}>
			<div className="first-row">
				<div className="chat-text">{text}</div>
				<div className="chat-hour">{time}</div>
			</div>
			<div>
				<div className="chat-date">{date}</div>
			</div>
		</li>
	);
};

ChatMessage.propTypes = {
	chatAlign: PropTypes.string,
	text: PropTypes.string,
	date: PropTypes.string,
	time: PropTypes.string
};
