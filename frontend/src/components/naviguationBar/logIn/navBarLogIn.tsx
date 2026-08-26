import "./navBarLogIn.css";

function NavBarLogIn() {

	return (
		<nav className="navbar">
			<a href="logo" className="navbar_image"></a>
			<div className="navbar-right">
				<a href="#messageBox" className="navbar_messageBox"></a>
				<a href="#likes" className="navbar_heart"></a>
				<a href="#notifications" className="navbar_notifs"></a>
				<a href="#myProfile" className="navbar_myProfile"></a>
			</div>
		</nav>
	);
}

export default NavBarLogIn;