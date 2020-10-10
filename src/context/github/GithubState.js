import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING} from "../types";

// netlify da yayınlamak için....
let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
	githubClientId=process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret=process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else{
	githubClientId=process.env.GITHUB_CLIENT_ID;
	githubClientSecret=process.env.GITHUB_CLIENT_SECRET;
}


// Burada App.js içinde yazmış olduğumuz metodları direkt olarak burda yazarak, App componenti içinde Provider olarak kullanacağız.... GLOBAL STATELERİMİZİ BU DOSYADA TUTUYORUZ...
const GithubState = (props) => {
	//Global States...
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	// Reducers and action...
	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Github users..
	const searchUsers = async (text) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	};

	// Search single Github User
	const getUser = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	//get User repos
	const getUserRepos = async (username) => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
		);
		dispatch({ type: GET_REPOS, payload: res.data });
	};

	//remove users from state
	const removeUsers = () => dispatch({ type: CLEAR_USERS,});

	//Set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				getUser,
				getUserRepos,
				removeUsers,
			}}>
			{/* İçine diğer componentlara alacağımız için. props.children kullandık.. Araştır!! */}
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
