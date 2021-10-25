import Swal from "sweetalert2";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			access_token: null,
			user_id: null,
			treatments: [],
			centers: [],
			couples: [],
			processes: []
		},
		actions: {
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
					const token = localStorage.getItem("access_token");
					const user_id = localStorage.getItem("user_id");
					let isUserLogged = user_id && user_id !== undefined && user_id !== "";
					let TokenExist = token && token !== undefined && token !== "";
					if (isUserLogged && TokenExist) {
						setStore({ user_id: user_id });
						setStore({ access_token: token });
					}
				}
				return token;
			},
			syncUserFromLocalStorage: () => {
				const user_id = localStorage.getItem("user_id");
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
					confirmButtonText: confirmButtonText
				});
			}
		}
	};
};

export default getState;
