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
		res.status(400).send();
		return;
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
