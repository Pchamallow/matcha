import "./navBarLogIn.css";
import Cookies from "universal-cookie";

import { Navigate } from "react-router-dom";


const handleDeconnexion = async () => {
	
	// requete db supprimer toute la ligne de l user dans user_token

	const cookies = new Cookies();
	const token = cookies.get("sessionToken");

	// PLACEHOLDER POUR LA STRUCTURE USER -> username ------------------
		const response = await fetch(`http://localhost:3000/api/db/getSession?token=${token}`);
		if (!response.ok)
		{
			console.error(response.text());
			return undefined;
		}
		const user = await response.json();
		cookies.remove("sessionToken");
	// -------------------------------------------------------------------

	alert(user.username); // DEBUG

	const deleteSession = await fetch ("http://localhost:3000/api/db/deleteSession", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify( { username: user.username } ),
	});

	if (deleteSession.status == 400)
		console.error("deleteSession : username missing");
	else if (deleteSession.status == 500)
		throw await response.text();



	// navguer vers la page login
	// return <Navigate to="/" replace />;
};


function NavBarLogIn() {

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<a href="#logo-clownder" className="navbar_logo"></a>
				<div id="navbar-left">
					<input className="search" placeholder="Search..">
					</input>
				</div>
				<a href="#meet" className="navbar_meet"></a>
			</div>
			<div className="navbar-right">
				<a href="#messageBox" className="navbar_messageBox"></a>
				<a href="#likes" className="navbar_heart"></a>
				<a href="#notifications" className="navbar_notifs"></a>
				<a href="#myProfile" className="navbar_myProfile"></a>
				<a
					href="#deconnection" className="navbar_deco"
					onClick={(e) => {
						e.preventDefault();
						handleDeconnexion();
					}}
				></a>
			</div>
		</nav>
	);
}

export default NavBarLogIn;