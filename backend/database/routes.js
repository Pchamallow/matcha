import express from "express";
import db from "./db.js";

const router = express.Router();

router.post('/addUser', async (req, res) => {
	const { username } = req.body;
	if (typeof username === 'undefined')
		return res.status(400).send("Bad request");
	let conn;
	try
	{
		await db.run("INSERT INTO `test`(`username`) VALUES (?)", [username]);

		console.log(username + " logged.");
	} catch (error)
	{
		console.error("grosse erreur!!! : " + error.message);
	} finally
	{
		if (conn) await conn.release();
	}
	res.status(201).send();
})

export default router;
