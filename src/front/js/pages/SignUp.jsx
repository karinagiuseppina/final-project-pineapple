import React from "react";

const SignUp = () => {
	return (
		<>
			<h1>Sign Up</h1>
			<form>
				<input type="text" required />
				<input type="text" required />
				<input type="email" required />
				<input type="password" required />
			</form>
		</>
	);
};

export default SignUp;
