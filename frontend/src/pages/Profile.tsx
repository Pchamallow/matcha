import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "universal-cookie";

interface User
{
	username: string,
	first_name: string,
	last_name: string,
	email: string,
	gender: string,
	city: string,
};

function Profile() {
	const navigate = useNavigate();

	useEffect(() => {
		async function retrieveUser()
		{
			const cookies = new Cookies();
			const cookie = cookies.get("sessionToken");

			if (!cookie)
			{
				navigate("/");
				alert("You aren't logged in.");
				return;
			}
			const user = await getSession(cookie);
			if (!user)
				return;
			console.log(user);
			const profileDiv = document.getElementById('profile');
			const username = document.createElement("div");
			username.textContent = "Username: " + user.username;
			profileDiv?.appendChild(username);
			const first_name = document.createElement("div");
			first_name.textContent = "First name: " + user.first_name;
			profileDiv?.appendChild(first_name);
			const last_name = document.createElement("div");
			last_name.textContent = "Last name: " + user.last_name;
			profileDiv?.appendChild(last_name);
			const email = document.createElement("div");
			email.textContent = "Email: " + user.email;
			profileDiv?.appendChild(email);
			const gender = document.createElement("div");
			gender.textContent = "Gender: " + (user.gender == "F" ? "Female" : user.gender == "M" ? "Male" : "Not specified");
			profileDiv?.appendChild(gender);
			const city = document.createElement("div");
			city.textContent = "City: " + user.city;
			profileDiv?.appendChild(city);
		}
		retrieveUser();
	}, [navigate])

	async function getSession(token: string) : Promise<User | undefined>
	{
		const response = await fetch(`http://localhost:3000/api/db/getSession?token=${token}`);
		if (!response.ok)
		{
			console.error(response.text());
			return undefined;
		}
		const user: User = await response.json();
		return user;
	}

	return (
		<>
			<header>
				<div className="banner">
					<div className="banner__text">
						Clownder
					</div>
				</div>
			</header>
			<div className="background">
				<div id="profile">
					<p>Profile</p>
				</div>
			</div>
		</>
	);
}

export default Profile;
