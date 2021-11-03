import React, { useContext, useState } from "react";
import avatar1 from "../../img/avatar1.png";
import avatar2 from "../../img/avatar2.png";
import avatar3 from "../../img/avatar3.png";
import PropTypes, { array } from "prop-types";

export const AvatarImage = ({ classN, Alt, profileImg }) => {
	const avatars = [avatar1, avatar2, avatar3];

	function avatarRandomImage(array) {
		const randomIndex = Math.floor(Math.random() * array.length);
		console.log(randomIndex);
		const avatar = array[randomIndex];
		console.log(avatar);
		return avatar;
	}
	return <img className={classN} src={profileImg ? profileImg : avatarRandomImage(avatars)} alt={Alt} />;
};

AvatarImage.propTypes = {
	classN: PropTypes.string,
	Alt: PropTypes.string,
	profileImg: PropTypes.bool
};
