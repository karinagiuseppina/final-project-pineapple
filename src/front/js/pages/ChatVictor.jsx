import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import pinaPartidaNombre from "../../img/pina-partida-nombre.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

const ChatVictor = () => {
	const { store, actions } = useContext(Context);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [conversationId, setConversationId] = useState(null);

	const startConversation = async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/start-conversation`, {
			method: "POST"
		});
		const responseJson = await response.json();
		setConversationId(responseJson.id);
		//setInterval(getMessages, 2000);
	};

	const getMessages = async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/conversation/${conversationId}/messages`, {
			headers: {
				"Content-Type": "application/json"
			}
		});
		const responseJson = await response.json();
		setMessages(responseJson);
	};

	const sendMessage = async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/conversation/${conversationId}/send-message`, {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				sender_id: 1,
				message: newMessage
			})
		});
		const responseJson = await response.json();
		setMessages([...messages, responseJson]);
	};

	return (
		<div className="text-center mt-5">
			<button onClick={startConversation}>Iniciar Conversacion</button>
			<button onClick={getMessages}>Recibir Mensajes</button>
			<div className="messages">
				{messages.map(message => {
					console.log(message);
					return (
						<p key={message.id}>
							{message.pub_date} - {message.value}
						</p>
					);
				})}
			</div>
			<div>
				<input type="text" onChange={event => setNewMessage(event.target.value)} />
				<button onClick={sendMessage}>Enviar</button>
			</div>
		</div>
	);
};

export default ChatVictor;
