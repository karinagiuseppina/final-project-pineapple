import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import ChatList from "./pages/ChatList.jsx";
import { Home } from "./pages/home";
import { Signup1 } from "./pages/signup-1";
import { Login } from "./pages/login";
import { Signup2 } from "./pages/signup-2";
import { Signup3 } from "./pages/signup-3";
import { Signup4 } from "./pages/signup-4";
import { Signup6 } from "./pages/signup-6";
import { Signup5 } from "./pages/signup-5";
import { Signup7 } from "./pages/signup-7";
import { Signup8 } from "./pages/signup-8";
import { ListOfWomen } from "./pages/list-of-women";
import { Profile } from "./pages/profile";
import { EditProfile } from "./pages/editProfile";
import { MoreUserInfo } from "./pages/moreUserInfo";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/chat">
							<ChatList />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup-1">
							<Signup1 />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup-2">
							<Signup2 />
						</Route>
						<Route exact path="/signup-3">
							<Signup3 />
						</Route>
						<Route exact path="/signup-4">
							<Signup4 />
						</Route>
						<Route exact path="/signup-5">
							<Signup5 />
						</Route>
						<Route exact path="/signup-6">
							<Signup6 />
						</Route>
						<Route exact path="/signup-7">
							<Signup7 />
						</Route>
						<Route exact path="/signup-8">
							<Signup8 />
						</Route>
						<Route exact path="/list-of-women">
							<ListOfWomen />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/usermoreinfo/:id">
							<MoreUserInfo />
						</Route>
						<Route exact path="/editProfile">
							<EditProfile />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
