import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const ActiveChat = ({ activeChat }) => {
	const { store, actions } = useContext(Context);

	const [chatInHTML, setChatInHTML] = useState(
		<div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">Select a chat.</div>
	);
	let emptyChat = <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">Select a chat.</div>;

	useEffect(
		() => {
			activeChat !== null
				? setChatInHTML(
						<div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
							<div className="selected-user">
								<span>
									<img
										src={
											activeChat.user.profile_img
												? activeChat.user.profile_img
												: "https://via.placeholder.com/48"
										}
										alt={`profile image of ${activeChat.user.name}`}
									/>
									<span className="name">{activeChat.user.name}</span>
								</span>
							</div>
							<div className="chat-container">
								<ul className="chat-box chatContainerScroll">
									<li className="chat-left">
										<div className="chat-text">
											Hello, Im Russell.
											<br />
											How can I help you today?
										</div>
										<div className="chat-hour">08:55</div>
									</li>
									<li className="chat-right">
										<div className="chat-hour">08:59</div>
										<div className="chat-text">
											Have you faced any problems at the last phase of the project?
										</div>
									</li>
									<li className="chat-left">
										<div className="chat-text">
											Actually everything was fine.
											<br />
											Im very excited to show this to our team.
										</div>
										<div className="chat-hour">07:00</div>
									</li>
								</ul>
								<div className="form-group mt-3 mb-0">
									<textarea
										className="form-control"
										rows="3"
										placeholder="Type your message here..."
									/>
								</div>
							</div>
						</div>
				  )
				: setChatInHTML(emptyChat);
		},
		[activeChat]
	);

	return chatInHTML;
};

ActiveChat.propTypes = {
	activeChat: PropTypes.obj
};
