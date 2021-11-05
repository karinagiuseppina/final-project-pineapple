import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { ChatMessage } from "./chatMessage";
import avatar1 from "../../img/avatar1.png";

export const ActiveChat = ({ activeChat, showList, setShowList }) => {
	const { store, actions } = useContext(Context);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");
	const [messagesInHTML, setMessagesInHTML] = useState([]);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		if (activeChat) getMessages();
		beginCounter();
	}, []);

	useEffect(() => {
		if (activeChat) getMessages();
	}, [activeChat]);

	function beginCounter() {
		setInterval(() => {
			setCounter(count => count + 1);
		}, 15000);
	}

	useEffect(() => {
		if (activeChat) getMessages();
	}, [counter]);

	const getMessages = async () => {
		let token = actions.getAccessToken();
		const response = await fetch(`${process.env.BACKEND_URL}/api/chat/${activeChat.id}/messages`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});
		if (response.ok) {
			const responseJson = await response.json();
			setMessages(responseJson);
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else sendMessage();
		}
	};

	async function sendMessage() {
		let token = actions.getAccessToken();
		const response = await fetch(`${process.env.BACKEND_URL}/api/chat/${activeChat.id}/send-message`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			method: "POST",
			body: JSON.stringify({
				message: message
			})
		});
		if (response.ok) {
			const responseJson = await response.json();
			setMessages([...messages, responseJson]);
			setMessage("");
		} else if (res.status === 401 || res.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else sendMessage();
		}
	}

	useEffect(() => {
		setMessagesInHTML(
			messages.map(message => {
				let chat_align = message.user_id === store.user_id ? "chat-right" : "chat-left";
				return (
					<ChatMessage
						key={message.id}
						text={message.value}
						time={message.hour}
						date={message.pub_date}
						chatAlign={chat_align}
					/>
				);
			})
		);
	}, [messages]);

	if (activeChat === null) {
		return (
			<div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
				¡Vaya! ¡No tienes piñas añadidas, comienza a buscar!
			</div>
		);
	}

	return (
		<div className="col-md-8 col-12 p-0">
			<div className={`chat-active ${showList ? "active-chat" : "show-active-chat"}`}>
				<div className="selected-user">
					<button className="btn-chats" onClick={() => setShowList(!showList)}>
						<i className="fas fa-chevron-left"></i> Chats
					</button>
					<div className="user-selected-data">
						<img
							src={activeChat.user.profile_img ? activeChat.user.profile_img : avatar1}
							alt={`profile image of ${activeChat.user.name}`}
						/>
						<span className="name">{activeChat.user.name}</span>
					</div>
				</div>
				<div className="chat-container">
					<ul className="chat-box chatContainerScroll">{messagesInHTML}</ul>
				</div>
				<div className="chat-writer">
					<input
						type="text"
						className="form-control flex-grow-1"
						onChange={e => setMessage(e.target.value)}
						value={message}
						onKeyDown={e => {
							if (e.keyCode === 13) sendMessage();
						}}
					/>
					<button onClick={sendMessage} className="button primary">
						Enviar
					</button>
				</div>
			</div>
		</div>
	);
};

ActiveChat.propTypes = {
	activeChat: PropTypes.object,
	showList: PropTypes.bool,
	setShowList: PropTypes.func
};
