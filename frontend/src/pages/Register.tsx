import { useState } from "react";

function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");

	async function register() {
		try {
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
		} catch (error) {
			console.error("pas bien bouhhh :", error);
		}
	}

	return (
		<>
			<div id="registration">
				<h1>Register</h1>
				<input type="text" placeholder="Username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
				<input type="password" placeholder="Password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)}/>
				<input type="text" placeholder="First name" autoComplete="given-name" value={first_name} onChange={(event) => setFirstName(event.target.value)}/>
				<input type="text" placeholder="Last name" autoComplete="family-name" value={last_name} onChange={(event) => setLastName(event.target.value)}/>
				<select value={gender} onChange={(event) => setGender(event.target.value)}>
					<option value="">Gender...</option>
					<option value="F">Female</option>
					<option value="M">Male</option>
					<option value="N">Non specified</option>
				</select>
				<input type="text" placeholder="Email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
				<input type="text" placeholder="City" autoComplete="address-level2" value={city} onChange={(event) => setCity(event.target.value)}/>
				<button onClick={register}>Register</button>
			</div>
		</>
	);
}

export default Register;
