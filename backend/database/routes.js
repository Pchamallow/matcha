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
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).send("Bad request");
	try
	{
		const user = await db.get("SELECT * FROM `users` WHERE `username` = ? AND `password` = ? OR `email` = ? AND `password` = ?",
			[username, password, username, password]);
		if (user)
			return res.status(200).send();
		res.status(404).send();
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
})

router.get('/getSession', async (req, res) => {
	const { token } = req.body;
	if (!token)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT * FROM `user_sessions` WHERE `token` = ?",
			[token]);
		if (row)
			return res.status(200).send(row.username);
		res.status(404).send();
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
})

router.post('/registerSession', async (req, res) => {
	const { username, token, start_date, end_date } = req.body;
	if (!username || !token || !start_date || !end_date)
		return res.status(400).send("Bad request");
	try
	{
		await db.run("INSERT INTO `user_sessions` (username, token, start_date, end_date) VALUES (?,?,?,?)",
			[username, token, start_date, end_date]);
		res.status(201).send("Token ", token, " registered for username ", username);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send();
	}
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).send("Bad request");
	try
	{
		const allUsers = await db.all("SELECT * FROM `users` WHERE `username` = ? AND `password` = ? OR `email` = ? AND `password` = ?",
			[username, password, username, password]);
		if (allUsers.length > 0)
		{
			console.log(username + " logged.");
			console.log(password);//a delete
			return res.status(200).send();
		}
		res.status(404).send();
	} catch (error)
	{
		console.error("Sql error : " + error.message);
	}
	res.status(201).send();
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res.status(400).send("Bad request");
	try
	{
		const allUsers = await db.all("SELECT * FROM `users` WHERE `username` = ? AND `password` = ? OR `email` = ? AND `password` = ?",
			[username, password, username, password]);
		if (allUsers.length > 0)
		{
			console.log(username + " logged.");
			console.log(password);//a delete
			return res.status(200).send();
		}
		res.status(404).send();
	} catch (error)
	{
		console.error("Sql error : " + error.message);
	}
	res.status(201).send();
})

export default router;
