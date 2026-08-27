import "./navBarLogIn.css";

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
			</div>
		</nav>
	);
}

export default NavBarLogIn;