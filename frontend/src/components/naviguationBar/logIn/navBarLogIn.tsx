import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthProvider";
import SearchBar from "../searchBar/searchBar";
import SearchResultsList from "../searchBar/searchResultsList";
import "./navBarLogIn.css";
import { useState } from "react";

function NavBarLogIn() {

	const navigate = useNavigate();
	const { setUser } = useAuth();
	const { user } = useAuth();
	const [ results, setResults ] = useState([]);

	async function handleDeconnexion() {
	
		const cookies = new Cookies();
		const token = cookies.get("sessionToken"); // used with api call

		try
		{
			const deleteSession = await fetch ("http://localhost:3000/api/db/deleteSession", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( { username: user?.username} ),
			});
			if (!deleteSession.ok)
			{
				console.error(await deleteSession.text());
				return;
			}
			setUser(null);
			navigate("/");
		}
		catch (error)
		{
			console.error("Logout error :", error);
		}

	};

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<a href="#logo-clownder" className="navbar_logo"></a>
				<SearchBar setResults={setResults} />
				{/* avoir la searchbar ici pose probleme avce les input de register et login (case beaucoup + grandes)*/}
				<SearchResultsList results={results}/>
				<div id="navbar-left">
					{/* <input className="search" placeholder="Search..">
					</input> */}
				</div>
				<a href="#meet" className="navbar_meet"></a>
			</div>
			<div className="navbar-right">
				<a href="#messageBox" className="navbar_messageBox"></a>
				<a href="#likes" className="navbar_heart"></a>
				<a href="#notifications" className="navbar_notifs"></a>
				<a href="#myProfile" className="navbar_myProfile"></a>
				<a
					href="#disconnect" className="navbar_deco"
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