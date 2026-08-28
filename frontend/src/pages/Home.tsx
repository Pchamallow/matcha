import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthProvider";
import CustomButton from "../components/buttons/CustomButton";
import NavBarLogOut from "../components/navigationBar/logOut/navBarLogOut";
import { useSearchParams } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const emailToken = searchParams.get('verify');

		if (!emailToken)
			return;

		navigate("/", { replace: true });
		verifyEmail(emailToken);
	})

	async function verifyEmail(token: string)
	{
		const response = await fetch("/api/db/verifyEmail", {
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
				<NavBarLogOut></NavBarLogOut>
			</header>
			<div className="background">
				<div id="home">
					<CustomButton label="Register" navigate={register}></CustomButton>
					<CustomButton label="Login" navigate={login}></CustomButton>
				</div>
			</div>
		</>
	);
}

export default Home;
