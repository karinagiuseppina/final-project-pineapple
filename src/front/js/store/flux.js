const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			access_token: null,
			user_id: null
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
			syncUserFromLocalStorage: () => {
				const user_id = localStorage.getItem("user_id");
				const token = localStorage.getItem("access_token");
				let isUserLogged = user_id && user_id !== undefined && user_id !== "";
				let TokenExist = token && token !== undefined && token !== "";
				if (isUserLogged && TokenExist) {
					setStore({ user_id: user_id });
					setStore({ access_token: token });
				}
			}
		}
	};
};

export default getState;
