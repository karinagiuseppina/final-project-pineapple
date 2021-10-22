import React, { useState } from "react";
import { UserChatList } from "../component/UserChatList";
import { ActiveChat } from "../component/activeChat";

const ChatList = () => {
	const [activeChat, setActiveChat] = useState(null);
	return (
		<div className="container">
			<div className="page-title">
				<div className="row gutters">
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
						<h5 className="title">Chat App</h5>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"> </div>
				</div>
			</div>

			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="card m-0">
							<div className="row no-gutters">
								<UserChatList setActiveChat={setActiveChat} />
								<ActiveChat activeChat={activeChat} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatList;
