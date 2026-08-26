import { useState } from "react";
import {Eye, EyeOff} from "lucide-react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "../AuthProvider";
import ButtonCust from "../components/buttons/buttonCust";
import NavBar from "../components/naviguationBar/navBar";

function Login() {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const cookies = new Cookies();
	const handleToggle = () => setShowPassword((prev) => !prev);
	const navigate = useNavigate();
	const auth = useAuth();

	async function login() {
		try {
			const token = crypto.randomUUID();
			const response = await fetch("http://localhost:3000/api/db/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({username: user, password, token})
			});

			if (response.status == 400)
				alert("Username or password missing");
			else if (response.status == 404)
			{
				const { user, password } = await response.json();
				if (user)
					alert("Invalid username/email");
				else if (password)
					alert("Invalid password");
			}
			else if (response.status == 200)
			{
				alert("Log in successfully");
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 1);
				cookies.set("sessionToken", token, {
					maxAge: 3600, path: '/' });
				const value = cookies.get("sessionToken");
				const user: User = await response.json();
				auth.setUser(user);
				auth.setLoading(false);
				console.log(value);
				navigate("/profile");
			}
			else if (response.status == 500)
				throw await response.text();
		} catch (error) {
			console.error("Login error :", error);
		}
	}

	return (
		<>
			<header>
				<NavBar></NavBar>
			</header>
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
					<ButtonCust name="Login" naviguate={login}></ButtonCust>
					{/* <button onClick={login}>Login</button> */}
				</div>
			</div>
		</>
	);
}

export default Login;
