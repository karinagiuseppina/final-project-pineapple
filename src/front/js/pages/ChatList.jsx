import React, { useState } from "react";
import { UserChatList } from "../component/UserChatList";
import { ActiveChat } from "../component/activeChat";

const ChatList = () => {
	const [activeChat, setActiveChat] = useState(null);
	return (
		<div className="container">
			<div className="row gutters">
				<div className="row no-gutters">
					<UserChatList setActiveChat={setActiveChat} />
					<ActiveChat activeChat={activeChat} />
				</div>
			</div>
		</div>
	);
};

export default ChatList;
