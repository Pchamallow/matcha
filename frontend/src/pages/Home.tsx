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
			<button onClick={register}>Register</button>
			<button onClick={login}>Login</button>
		</>
	);
}

export default Home;
