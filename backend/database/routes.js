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

export default router;
