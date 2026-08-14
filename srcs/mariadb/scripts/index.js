import { pool } from './pool.js';

import express from 'express'
import cors from 'cors'
import mariadb from 'mariadb'

const app = express()
const port = 3001

app.use(cors());

app.post('/addUser', async (req, res) => {
	const { username } = req.body;
	if (typeof username === 'undefined')
		return res.status(400).send("Bad request");
	res.status(201).send();
	let conn;
	try
	{
		conn = await pool.getConnection((err) => {
			if (err)
			{
				console.error("ptit message machin bidule, jme dis ce serait ptetre plus simple pour voir si ya un truc: " + err);
				return;
			}
		});

		await pool.query("INSERT INTO `test`(`username`) VALUES (?)", [username], (err) => {
			if (err)
			{
				console.error("ptit message machin bidule, jme dis ce serait ptetre plus simple pour voir si ya un truc: " + err);
				return;
			}
		});

		console.log(username + " logged.");
	} catch (error)
	{
		console.log(error);
	} finally
	{
		if (conn) await conn.release();
		pool.end();
	}
})

app.listen(port, "0.0.0.0", () => {
	console.log(`Example app listening on port ${port}`)
})
