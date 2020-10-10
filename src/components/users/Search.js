import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";

const Search = () => {
	const { searchUsers, removeUsers, users } = useContext(GithubContext);
	const { setAlert } = useContext(AlertContext); // 2.bir contextden setAlert metodunu aldık...

	const [text, setText] = useState(""); // component state.

	const onSubmit = (e) => {
		e.preventDefault();

		if (text === "") {
			setAlert("Please enter something...", "light");
		} else {
			let inputValue = text.trim();
			searchUsers(inputValue);
			setText("");
		}
	};

	// e.target.name ile birden fazla input olduğu zaman, her birine farklı bir  onChange metodu eklemek yerine bir taneden hepsinin değerini ve state güncellemesini yapabilmemizi sağlar...
	const onChange = (e) => {
		setText(e.target.value);
		// text: e.target.value --- verdik. başka input olsa onun değeri olucaktı.
	};

	return (
		<div>
			<form className="form" onSubmit={onSubmit}>
				<input type="text" name="text" placeholder="Search Users" value={text} onChange={onChange} />
				<input type="submit" value="Search" className="btn btn-success btn-block" />
			</form>
			{users.length > 0 && (
				<button className="btn btn-block btn-danger" onClick={removeUsers}>
					Remove Users
				</button>
			)}
		</div>
	);
};

export default Search;
