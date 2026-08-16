import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	function register()
	{
		navigate("/register");
	}

	return (
		<>
			<button onClick={register}>Register</button>
		</>
	);
}

export default Home;
