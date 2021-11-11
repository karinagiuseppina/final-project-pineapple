import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import avatar1 from "../../img/avatar1.png";

export const UserChatList = ({ setActiveChat, showList, setShowList }) => {
	const { store, actions } = useContext(Context);

	const [chats, setChats] = useState([]);
	const [chatsSelected, setChatsSelected] = useState([]);
	const [chatsInHTML, setChatsInHTML] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [classList, setClassList] = useState("d-block");
	let History = useHistory();

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
		let token = actions.getAccessToken();
		const resp = await fetch(`${process.env.BACKEND_URL}/api/delete_chat/${chat.id}`, {
			method: "PUT",
			headers: { "Content-Type": "applicacion/json", Authorization: `Bearer ${token}` }
		});
		if (resp.ok) {
			actions.notificationAlert(
				"¡Eliminada correctamente!",
				`${chat.user.name} ya no forma parte de tus piñas`,
				`success`,
				`cerrar`
			);
			getChats();
		} else if (resp.status === 401 || resp.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else getChats();
		}
	};

	useEffect(() => {
		let regular_exp = new RegExp(`${searchInput}`);
		let temp = [];
		for (let i = 0; i < chats.length; i++) {
			let name = chats[i].user.name.toLowerCase();
			if (regular_exp.test(name)) temp.push(chats[i]);
		}
		setChatsSelected(temp);
	}, [searchInput]);

	const getChats = async () => {
		let token = actions.getAccessToken();

		const resp = await fetch(`${process.env.BACKEND_URL}/api/user/chats`, {
			method: "GET",
			headers: { "Content-Type": "applicacion/json", Authorization: `Bearer ${token}` }
		});
		if (resp.ok) {
			const data = await resp.json();
			setChats(data);
			setChatsSelected(data);
			if (data.length > 0) setActiveChat(data[0]);
		} else if (resp.status === 401 || resp.status == 422) {
			let resp = await actions.refresh_token();
			if (resp.error) History.push("/login");
			else getChats();
		}
	};

	useEffect(() => {
		getChats();
	}, []);

	const handleActiveChat = chat => {
		setActiveChat(chat);
		setShowList(!showList);
	};
	useEffect(() => {
		setChatsInHTML(
			chatsSelected.map(chat => {
				return (
					<li className="person" key={chat.id} onClick={() => handleActiveChat(chat)}>
						<div className="user">
							<img
								src={chat.user.profile_img ? chat.user.profile_img : avatar1}
								alt={`profile image of ${chat.user.name}`}
							/>
						</div>
						<p className="name-time">
							<span className="name">{chat.user.name}</span>
						</p>
						<div className="d-flex justify-content-end">
							<i className="fas fa-times" onClick={() => confirmDelete(chat)} />
						</div>
					</li>
				);
			})
		);
	}, [chats, chatsSelected]);

	return (
		<div className="col-md-4 col-12 p-0">
			<div className={`users-container ${showList ? "show-user-list" : "user-list"}`}>
				<div className="chat-search-box">
					<div className="input-group m-0">
						<input
							className="form-control"
							placeholder="Buscar piña"
							value={searchInput}
							onChange={e => setSearchInput(e.target.value)}
						/>
					</div>
				</div>
				<ul className="users">{chatsInHTML}</ul>
			</div>
		</div>
	);
};

UserChatList.propTypes = {
	setActiveChat: PropTypes.func,
	showList: PropTypes.bool,
	setShowList: PropTypes.func
};
