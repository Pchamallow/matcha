import express from "express";
import db from "./db.js";

const router = express.Router();

router.post('/addUser', async (req, res) => {
	const { username, password, first_name, last_name, gender, email, city } = req.body;
	if (!username || !password || !first_name || !last_name || !gender || !email || !city)
		return res.status(400).send("Bad request");
	try
	{
		await db.run("INSERT INTO `users` (username, password, first_name, last_name, gender, email, city) VALUES (?,?,?,?,?,?,?)",
			[username, password, first_name, last_name, gender, email, city]
		);

		console.log(username + " logged.");
	} catch (error)
	{
		console.error("grosse erreur!!! : " + error.message);
		res.status(500).send();
		return;
	}
	res.status(201).send();
})

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
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
});

router.post('/login', async (req, res) => {
	const { username, password, token } = req.body;
	if (!username || !password || !token)
		return res.status(400).send("Bad request");
	try
	{
		const user = await db.get("SELECT * FROM `users` WHERE `username` = ? AND `password` = ? OR `email` = ? AND `password` = ?",
			[username, password, username, password]);
		if (user)
		{
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
			return res.status(200).send("Back: Login successfully, yeay !");
		}
		res.status(404).send();
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
})

router.get('/getSession', async (req, res) => {
	const { token } = req.query;
	if (!token)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT * FROM users WHERE username = (SELECT username FROM `user_sessions` WHERE `token` = ?)",
			[token])
		if (row)
			return res.status(200).send(row);
		res.status(404).send(`${username} token not found in database.`);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
})

export { router };
