import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const UserChatList = ({ setActiveChat }) => {
	const { store, actions } = useContext(Context);

	const [chats, setChats] = useState([]);
	const [chatsInHTML, setChatsInHTML] = useState([]);

	const confirmDelete = chat => {
		Swal.fire({
			title: `¿Seguro que quieres eliminar a ${chat.user.name} de tus piñas?`,
			text: "¡No podrás volver atrás!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, quiero eliminarla!"
		}).then(result => {
			if (result.isConfirmed) {
				deleteChat(chat);
			}
		});
	};

	const deleteChat = async chat => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/delete_chat/${chat.id}`, {
			method: "PUT",
			headers: { "Content-Type": "applicacion/json", Authorization: `Bearer ${store.access_token}` }
		});
		if (resp.ok) {
			actions.notificationAlert(
				"¡Eliminada correctamente!",
				`${chat.user.name} ya no forma parte de tus piñas`,
				`success`,
				`cerrar`
			);
			getChats();
		}
	};

	const getChats = async () => {
		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/chats`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json", Authorization: `Bearer ${store.access_token}` }
		});
		if (resp.ok) {
			const data = await resp.json();
			setChats(data);
		}
	};

	useEffect(() => {
		actions.syncUserFromLocalStorage();
		getChats();
	}, []);

	useEffect(() => {
		setChatsInHTML(
			chats.map(chat => {
				return (
					<li className="person" key={chat.id} onClick={() => setActiveChat(chat)}>
						<div className="d-flex justify-content-end">
							<i className="fas fa-times" onClick={() => confirmDelete(chat)}></i>
						</div>
						<div className="user">
							<img
								src={chat.user.profile_img ? chat.user.profile_img : "https://via.placeholder.com/48"}
								alt={`profile image of ${chat.user.name}`}
							/>
						</div>
						<p className="name-time">
							<span className="name">{chat.user.name}</span>
						</p>
					</li>
				);
			})
		);
	}, [chats]);

	return (
		<div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
			<div className="users-container">
				<div className="chat-search-box">
					<div className="input-group">
						<input className="form-control" placeholder="Search" />
						<div className="input-group-btn">
							<button type="button" className="btn btn-info">
								<i className="fa fa-search" />
							</button>
						</div>
					</div>
				</div>
				<ul className="users">{chatsInHTML}</ul>
			</div>
		</div>
	);
};

UserChatList.propTypes = {
	setActiveChat: PropTypes.funtion
};
