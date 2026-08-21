import { useState } from "react";
import {Eye, EyeOff} from "lucide-react";
import Cookies, { Cookie } from 'universal-cookie';
import { useNavigate } from "react-router-dom";


function Login() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const cookies = new Cookies();
	const handleToggle = () => setShowPassword((prev) => !prev);
	const navigate = useNavigate();

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
			{
				alert("Log in successfully");
				const token = crypto.randomUUID();
				cookies.set(user, token, {
					maxAge: 3600, path: '/' });
				const value = cookies.get('userToken');
				console.log(value);
				navigate("/");
			}
		} catch (error) {
			console.error("Login error :", error);
		}
	}

	return (
		<>
			<div className="banner"> </div>
			<div className="background">
				<div id="login">
					<input
						type="text"
						placeholder="Username or email"
						value={user}
						onChange={(e) => setUser(e.target.value)}
					/>
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
					/>
					<button onClick={login}>Login</button>
				</div>
			</div>
		</>
	);
} 

export default Login;
