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
					<Logout/>
				</div>
			</div>
		</>
	);
}

const Logout = () => {
	return (
		<div>
			<button>Logout</button>
		</div>
	)
}

export default Home;
