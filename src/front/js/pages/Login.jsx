import React, { useState } from "react";

const Login = () => {
	const [loginInfo, setLoginInfo] = useState({});

	return (
		<>
			<h1>Login</h1>
			<form onSubmit="">
				<label>e-mail</label>
				<input type="email" required />
				<label>password</label>
				<input type="password" required />
			</form>
		</>
	);
};

export default Login;
