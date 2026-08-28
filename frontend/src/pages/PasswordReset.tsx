import { useNavigate } from "react-router-dom";
import CustomButton from "../components/buttons/CustomButton";
import { useState } from "react";
import NavBarLogOut from "../components/navigationBar/logOut/navBarLogOut";

function PasswordReset()
{
	const [email, setEmail] = useState("");

	async function submit()
	{
		try
		{
			const response = await fetch("/api/auth/sendPasswordEmail", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({email})
			});
			if (!response.ok)
				throw await response.text();
		} catch
		{
			console.error("Email not found.");
			alert("Email not found.");
			return;
		}
		alert(`An email has been sent to ${email}`);
	}

	return (
		<>
			<header>
				<NavBarLogOut></NavBarLogOut>
			</header>
			<div className="background">
				<div id="password-reset-container">
					<input id="email"
						placeholder="Your email..."
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<CustomButton label="Submit" navigate={submit}></CustomButton>
				</div>
			</div>
		</>
	);
}

export default PasswordReset;
