import React from "react";
import {Link} from 'react-router-dom';
const Navbar = (props) => {
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className="fab fa-github"></i> {props.title}
			</h1>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
		</nav>
	);
};


// parenttan props value gelmese de propsları kullanmamızı sağlar..
Navbar.defaultProps= {
	title:'Github Finder'
}

//props tiplerini ve required bilgilerini girebiliriz. Böylece kodlama esnasında propsların kontrolünü sağlamış oluruz.
// Navbar.propTypes={
// 	title:this.propTypes.string.isRequired
// }

export default Navbar;

// ----------------------------------------- NOTLAR ---------------------------------------------------
