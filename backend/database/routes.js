import express from "express";
import bcrypt from "bcrypt";
import db from "./db.js";

const router = express.Router();

router.post('/addUser', async (req, res) => {
	const { username, password, first_name, last_name, gender, email, city } = req.body;
	if (!username || !password || !first_name || !last_name || !gender || !email || !city)
		return res.status(400).send("Bad request");
	try
	{
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.run("INSERT INTO `users` (username, password, first_name, last_name, gender, email, city) VALUES (?,?,?,?,?,?,?)",
			[username, hashedPassword, first_name, last_name, gender, email, city]
		);

		console.log(username + " logged");
	}
	catch (error)
	{
		if (error.code === 'SQLITE_CONSTRAINT')
		{
			const isUsername = error.message.includes('users.username');
			const isEmail = error.message.includes('users.email');

			console.log("addUser: sql error");

			return res.status(409).json({
				usernameTaken: isUsername,
				emailTaken: isEmail
			});
		}
		console.error("addUser : " + error.message);
		res.status(500).send(error.message);
		return;
	}
	res.status(201).send();
});

router.get('/getUser', async (req, res) => {
	const { username } = req.body;
	if (!username)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT * FROM `users` WHERE `username` = ?",
			[username]);
		if (row)
		{
			return res.status(200).send({
				username: row.username,
				first_name: row.first_name,
				last_name: row.last_name,
				gender: row.gender,
				email: row.email,
				city: row.city
			});
		}
		res.status(404).send();
	}
	catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

router.post('/login', async (req, res) => {
	const { username, password, token } = req.body;
	if (!username || !password || !token)
		return res.status(400).send("Bad request");
	try
	{
		const user = await db.get("SELECT * FROM `users` WHERE `username` = ?  OR `email` = ?",
			[username], [username]);
		if (!user)
			return res.status(404).json({user: 1, password: 0});

		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(404).json({user: 0, password: 1});

		const date = new Date();
		const formatDate = (date) =>
			date.getFullYear().toString() +
			String(date.getMonth() + 1).padStart(2, "0") +
			String(date.getDate()).padStart(2, "0") +
			String(date.getHours()).padStart(2, "0") +
			String(date.getMinutes()).padStart(2, "0") +
			String(date.getSeconds()).padStart(2, "0");
		const startDate = new Date();
		const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

		await db.run("INSERT INTO `user_sessions` (username, token, start_date, end_date) VALUES (?,?,?,?)",
			[username, token, startDate.getTime(), endDate.getTime()]);

		console.log(username + " logged in");
		return res.status(200).send("login successfully, yeay !");
	}
	catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

router.get('/getSession', async (req, res) => {
	const { token } = req.query;
	if (!token)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT username, first_name, last_name, gender, email, email_verified, fame_rating, city FROM users WHERE username \
				= (SELECT username FROM `user_sessions` WHERE `token` = ?)",
			[token])
		if (row)
		{
			return res.status(200).send({
				username: row.username,
				first_name: row.first_name,
				last_name: row.last_name,
				gender: row.gender,
				email: row.email,
				city: row.city
			});
		}
		res.status(404).send(`${username} token not found in database.`);
	}
	catch (error)
	{
		console.error("getSession : " + error.message);
		res.status(500).send();
	}
})

router.post('/registerEmail', async (req, res) => {
	const { email, token } = req.body;
	if (!email || !token)
		return res.status(400).send("Bad request");
	try
	{
		await db.run("INSERT INTO mail_tokens (email, token) VALUES (?,?)",
			[email, token]);
		res.status(200).send(`Email token logged!`);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

router.post('/verifyEmail', async (req, res) => {
	const { token } = req.body;
	if (!token)
		return res.status(400).send("Bad request");
	try
	{
		const result = await db.run("UPDATE users SET email_verified = ? WHERE email = (SELECT email FROM `mail_tokens` WHERE `token` = ?)",
			[1, token]);
		if (result.changes == 0)
			return res.status(400).send("Invalid token");
		res.status(200).send(`Email verified!`);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

export { router };
