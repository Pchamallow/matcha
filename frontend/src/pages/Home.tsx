import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

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
			<div className="banner">
				<div className="banner__context"
				<strong> Clownder </strong>
			</div>
			<div id="home">
				<button onClick={register}>Register</button>
				<button onClick={login}>Login</button>
			</div>
		</>
	);
}

export default Home;
