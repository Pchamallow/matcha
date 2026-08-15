function registerEvents(): void
{
	const registerButton = document.getElementById('register') as HTMLInputElement | null;
	registerButton?.addEventListener("click", register);
}

async function register(): Promise<void>
{
	const API_URL = "http://localhost:3000/addUser"

	const textbox = document.getElementById('name') as HTMLInputElement | null;

	if (!textbox)
	{
		console.error("Element #textbox not found");
		return;
	}

	const name = textbox.value;

	try
	{
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({username: name})
		});
		if (response.status == 400)
			throw response.text();
		alert("Done!");
	} catch (error: unknown)
	{
		if (error instanceof Error)
			console.error("pas bien bouhhh : ", error.message);
		else
			console.error("pas bien bouhhh : ", error);
	}
}

registerEvents();
