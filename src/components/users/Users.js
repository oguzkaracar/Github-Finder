import React, { useContext }  from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
	const { loading, users} = useContext(GithubContext);
	
	return (
		<div style={userStyle}>{loading ? <Spinner /> : users.map((user) => <UserItem key={user.id} user={user} />)}</div>
	);
};
export default Users;

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem",
};
