import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider";

function Home() {
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const emailToken = params.get('verify');

		if (!emailToken)
			return;

		navigate("/", { replace: true });
		verifyEmail(emailToken);
	})

	async function verifyEmail(token: string)
	{
		const response = await fetch("http://localhost:3000/api/db/verifyEmail", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({token})
		});
		if (!response.ok)
			alert(await response.text());
		else
			alert(`Email verified!`);
	}

	function register()
	{
		navigate("/register");
	}

	function login()
	{
		navigate("/login");
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
				<div id="home">
					<button onClick={register}>Register</button>
					<button onClick={login}>Login</button>
					<button>Logout</button>
				</div>
			</div>
		</>
	);
}

export default Home;
