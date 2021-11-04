import React, { useState } from "react";
import { UserChatList } from "../component/UserChatList";
import { ActiveChat } from "../component/activeChat";

const ChatList = () => {
	const [activeChat, setActiveChat] = useState(null);
	const [classActiveChat, setClassactiveChat] = useState(false);
	return (
		<div className="container">
			<div className="row no-gutters">
				<UserChatList setActiveChat={setActiveChat} setClassactiveChat={setClassactiveChat} />
				<ActiveChat
					classActiveChat={classActiveChat}
					activeChat={activeChat}
					setClassactiveChat={setClassactiveChat}
				/>
			</div>
		</div>
	);
};

export default ChatList;
