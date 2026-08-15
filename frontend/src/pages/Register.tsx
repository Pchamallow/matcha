import { useState } from "react";

function Register() {
	const [name, setName] = useState("");

	async function register() {
		try {
			const response = await fetch("http://localhost:3000/addUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({username: name})
			});

			if (response.status == 400)
				throw response.text();

			alert("Done!");
		} catch (error) {
			console.error("pas bien bouhhh :", error);
		}
	}

	return (
		<>
			<h1>Hello World!</h1>
			<input type="text" placeholder="Your name..."/>
			<button onClick={register} onChange={(event) => setName(event.target.value)}>CLIQUE MOIIIIIIIIIIIIII</button>
		</>
	);
}

export default Register;
