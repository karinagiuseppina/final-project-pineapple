import React, { useState } from "react";
import { UserChatList } from "../component/UserChatList";
import { ActiveChat } from "../component/activeChat";

const ChatList = () => {
	const [activeChat, setActiveChat] = useState(null);
	const [showList, setShowList] = useState(true);
	return (
		<div className="container-chat">
			<div className="content-wrapper">
				<div className="row gutters">
					<div className="col-12 p-0">
						<div className="row no-gutters card-chat">
							<UserChatList setActiveChat={setActiveChat} showList={showList} setShowList={setShowList} />
							<ActiveChat activeChat={activeChat} showList={showList} setShowList={setShowList} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatList;
