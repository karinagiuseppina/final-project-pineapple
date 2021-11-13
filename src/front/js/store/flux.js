import Swal from "sweetalert2";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			access_token: null,
			user_id: null,
			treatments: [],
			centers: [],
			couples: [],
			processes: [],
			notifications: []
		},
		actions: {
			setNotificationsList: data => {
				const store = getStore();
				setStore({ notifications: data });
			},

			getNotifications: async () => {
				const store = getStore();
				const actions = getActions();
				const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.user_id}/notifications`, {
					method: "GET",
					headers: { "Content-Type": "application/json" }
				});
				if (response.ok) {
					const data = await response.json();

					actions.setNotificationsList(data.notification);
				}
			},
			updateInitialUser: updateUser => {
				const store = getStore();
				setStore({ initialUser: updateUser });
			},
			setUserSession: (token, user_id) => {
				localStorage.setItem("access_token", token);
				localStorage.setItem("user_id", user_id);
				setStore({ access_token: token });
				setStore({ user_id: user_id });
			},
			deleteUserSession: () => {
				localStorage.removeItem("user_id");
				localStorage.removeItem("access_token");
				setStore({ user_id: null });
				setStore({ access_token: null });
			},
			getAccessToken: () => {
				let token = getStore().access_token;
				if (token === null) {
					token = localStorage.getItem("access_token");
					const user_id = JSON.parse(localStorage.getItem("user_id"));
					let isUserLogged = user_id && user_id !== undefined && user_id !== "";
					let TokenExist = token && token !== undefined && token !== "";
					if (isUserLogged && TokenExist) {
						setStore({ user_id: user_id });
						setStore({ access_token: token });
					}
				}
				return token;
			},
			getUserId: () => {
				let user_id = getStore().user_id;
				if (user_id === null) {
					const token = localStorage.getItem("access_token");
					user_id = JSON.parse(localStorage.getItem("user_id"));
					let isUserLogged = user_id && user_id !== undefined && user_id !== "";
					let TokenExist = token && token !== undefined && token !== "";
					if (isUserLogged && TokenExist) {
						setStore({ user_id: user_id });
						setStore({ access_token: token });
					}
				}
				return user_id;
			},
			refresh_token: async () => {
				let user_id = getActions().getUserId;
				if (user_id !== null) {
					const response = await fetch(`${process.env.BACKEND_URL}/api/refresh-token`, {
						method: "POST",
						headers: { "content-Type": "application/json" },
						body: JSON.stringify({
							user_id: user_id
						})
					});
					if (response.ok) {
						let data = await response.json();
						getActions().setUserSession(data.token, user_id);
						return { msg: "ok" };
					}
				}
				return { msg: "Es necesario volver a logearse.", error: 401 };
			},
			syncUserFromLocalStorage: () => {
				const user_id = JSON.parse(localStorage.getItem("user_id"));
				const token = localStorage.getItem("access_token");
				let isUserLogged = user_id && user_id !== undefined && user_id !== "";
				let TokenExist = token && token !== undefined && token !== "";
				if (isUserLogged && TokenExist) {
					setStore({ user_id: user_id });
					setStore({ access_token: token });
				}
			},
			getElements: async (elements, set) => {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/${elements}`, {
					method: "GET",
					headers: { "Content-Type": "applicacion/json" }
				});
				if (resp.ok) {
					const data = await resp.json();
					set(data);
					// return data;
				}
			},
			setElements: async () => {
				let treatments = await getActions().getElements("treatments");
				let centers = await getActions().getElements("centers");
				let couples = await getActions().getElements("couples");
				let process = await getActions().getElements("processtimeslots");

				setStore({ centers: centers });
				setStore({ treatments: treatments });
				setStore({ couples: couples });
				setStore({ processes: process });
			},
			notificationAlert: (title, text, icon, confirmButtonText) => {
				Swal.fire({
					title: title,
					text: text,
					icon: icon,
					buttonsStyling: false,
					customClass: {
						confirmButton: "button primary swal"
					},
					// buttonsStyling: "false",
					// confirmButtonColor: "#A5DD81",
					confirmButtonText: confirmButtonText
				});
			}
		}
	};
};

export default getState;
