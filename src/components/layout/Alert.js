import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {

	// global alert state'ini aldık. ve kullanıcaz..
	const { alert } = useContext(AlertContext);

	return (
		alert != null && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle"></i> {alert.msg}
			</div>
		)
	);
};

export default Alert;
