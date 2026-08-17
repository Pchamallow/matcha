import { useState } from "react";


function Login() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	async function login() {
		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({username: user, password})
			});

			if (response.status == 400)
				alert("Username or password missing");
			else if (response.status == 404)
				alert("Invalid username/email or password");
			else if (response.status == 200)
				alert("Log in successfully");

		} catch (error) {
			console.error("pas bien bouhhh :", error);
		}
	}

	return (
		<>
			<div className="banner"> </div>
			<div className="background">
				<div id="login">
					<input type="text" placeholder="Username or email" value={user} onChange={(e) => setUser(e.target.value)}/>
					<input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					<button onClick={login}>Login</button>
				</div>
			</div>
		</>
	);
} 

export default Login;
