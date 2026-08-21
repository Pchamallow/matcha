import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");

	const navigate = useNavigate();

	async function register() {
		try {
			if (!username || !password || !repeatPassword || !first_name || !last_name || !gender || !gender || !email || !city)
			{
				alert("Do not leave empty fields.");
				return;
			}
			else if (/\s/.test(password) || password.length > 30 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^\w]/.test(password))
			{
				alert("Invalid password.");
				return;
			}
			else if (repeatPassword != password)
			{
				alert("Passwords don't match.");
				return;
			}
			const response = await fetch("http://localhost:3000/addUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({username, password, first_name, last_name, gender, email, city})
			});

			if (response.status == 400)
			{
				alert("Error!");
				throw response.text();
			}

			alert("Done!");
			navigate("/");
		} catch (error) {
			console.error("pas bien bouhhh :", error);
		}
	}

	function update(id: string, requirement: boolean, text: string)
	{
		const element = document.getElementById(id);
		element!.textContent = (requirement ? "✔ " : "✗ ") + text;
		element!.style.color = requirement ? "#259702b9" : "#97021ab9";
	}

	function updatePasswordRequirements(newPassword : string) {
		if (/\s/.test(newPassword))
			return;

		update("pw-requirement-length", newPassword.length >= 8, "At least 8 characters");
		// Regex to get from A to Z
		update("pw-requirement-caps", /[A-Z]/.test(newPassword), "At least 1 capitalized letter");
		// Regex to get from 0 to 9
		update("pw-requirement-digit", /[0-9]/.test(newPassword), "At least 1 digit");
		// Regex to get special characters
		update("pw-requirement-special", /[^\w]/.test(newPassword), "At least 1 special character (@, !, %, ...)");

		const repeatPasswordField = document.getElementById("pw-repeat") as HTMLInputElement;

		setPassword(newPassword);
	}

	function updateRepeatPassword(newPassword : string)
	{
		if (/\s/.test(newPassword))
			return;

		const repeatPasswordField = document.getElementById("pw-repeat");
		if (newPassword.length > 0 && newPassword != password)
			repeatPasswordField!.style.backgroundColor = "#ff869ab9"
		else
			repeatPasswordField!.style.backgroundColor = "#ffffffff"
		setRepeatPassword(newPassword);
	}

	return (
		<>
			<header>
				<div className="banner"></div>
			</header>
			<div className="background">
				<div id="registration">
					<h1>Register</h1>
					<input type="text" placeholder="Username" autoComplete="username" value={username}
						onChange={(event) => setUsername(event.target.value)}/>
					<input type="password" placeholder="Password" autoComplete="new-password" maxLength={30} value={password}
						onChange={(event) => updatePasswordRequirements(event.target.value)}/>
					<div id="pw-requirements">
						<p id="pw-requirement-length">✗ At least 8 characters</p>
						<p id="pw-requirement-caps">✗ At least 1 capitalized letter</p>
						<p id="pw-requirement-digit">✗ At least 1 digit</p>
						<p id="pw-requirement-special">✗ At least 1 special character (@, !, %, ...)</p>
					</div>
					<input id="pw-repeat" type="password" placeholder="Repeat your password" autoComplete="off" maxLength={30} value={repeatPassword}
						onChange={(event) => updateRepeatPassword(event.target.value)}/>
					<input type="text" placeholder="First name" autoComplete="given-name" value={first_name}
						onChange={(event) => setFirstName(event.target.value)}/>
					<input type="text" placeholder="Last name" autoComplete="family-name" value={last_name}
						onChange={(event) => setLastName(event.target.value)}/>
					<select value={gender} onChange={(event) => setGender(event.target.value)}>
						<option value="">Gender...</option>
						<option value="F">Female</option>
						<option value="M">Male</option>
						<option value="N">Non specified</option>
					</select>
					<input type="text" placeholder="Email" autoComplete="email" value={email}
						onChange={(event) => setEmail(event.target.value)}/>
					<input type="text" placeholder="City" autoComplete="address-level2" value={city}
						onChange={(event) => setCity(event.target.value)}/>
					<button onClick={register}>Register</button>
				</div>
			</div>
		</>
	);
}

export default Register;
