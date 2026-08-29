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
		await db.run("INSERT INTO `users` (`username`, `password`, `first_name`, `last_name`, `gender`, `email`, `city`) VALUES (?,?,?,?,?,?,?)",
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

// changer pour ne renvoyer que les username pas le reste
router.get('/getUsers', async (req, res) => {
	const { input } = req.query;
	if (!input)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.all("SELECT `username` FROM `users` WHERE `username` LIKE ?",
			[`${input}%`]);
		if (row)
		{
			return res.status(200).send(row);
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

		await db.run("INSERT INTO `user_sessions` (`username`, `token`, `start_date`, `end_date`) VALUES (:username,:token,:startDate,:endDate) \
				ON CONFLICT(`username`) DO UPDATE SET `token`=:token, `start_date`=:startDate, `end_date`=:endDate",
			{
				":username": username,
				":token": token,
				":startDate":startDate.getTime(),
				":endDate":endDate.getTime()
			}
		);

		console.log(username + " logged in");
		return res.status(200).send({
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			gender: user.gender,
			city: user.city
		});
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
		const nameRow = await db.get("SELECT `username` FROM `user_sessions` WHERE `token` = ?",
			[token]);
		if (!nameRow)
			return res.status(404).send("Username not found.");
		const row = await db.get("SELECT `username`, `first_name`, `last_name`, `gender`, `email`, `email_verified`, `fame_rating`, `city` FROM `users` \
				WHERE `username` = ?",
			[token, nameRow.username]);
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
		res.status(200).send();
	}
	catch (error)
	{
		console.error("getSession : " + error.message);
		res.status(500).send(error.message);
	}
})

router.post('/deleteSession', async (req, res) => {
	const { username } = req.body;
	if (!username)
		return res.status(400).send("Bad request");

	try
	{
		await db.run("DELETE FROM `user_sessions` WHERE `username`=:username",
				{ ":username":username }
			);
		res.status(200).send(`User session successfully deleted.`);
	}
	catch (error)
	{
		console.error("deleteSession - Sql : " + error.message);
		res.status(500).send(error.message);
	}
});

router.post('/registerEmail', async (req, res) => {
	const { email, token } = req.body;
	if (!email || !token)
		return res.status(400).send("Bad request");
	try
	{
		await db.run("INSERT INTO `mail_tokens` (`email`, `token`) VALUES (?,?)",
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
		const result = await db.run("UPDATE `users` SET `email_verified` = ? WHERE `email` = (SELECT `email` FROM `mail_tokens` WHERE `token` = ?)",
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

router.get('/isPasswordResetTokenValid', async (req, res) => {
	const { token } = req.query;
	if (!token)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT `email` FROM `password_tokens` WHERE `token` = ?",
			[token])
		if (row)
			return res.status(200).send();
		res.status(404).send(`Token ${token} not found in database.`);
	}
	catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
})

router.post('/registerPasswordToken', async (req, res) => {
	const { email, token } = req.body;
	if (!email || !token)
		return res.status(400).send("Bad request");
	try
	{
		const row = await db.get("SELECT * FROM `users` WHERE `email` = ?",
			[email]);
		if (!row)
			return res.status(404).send("Email not found.");
		await db.run("INSERT INTO `password_tokens` (`email`, `token`) VALUES (?,?)",
			[email, token]);
		res.status(200).send(`Password token logged!`);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

router.post('/changePassword', async (req, res) => {
	const { token, password } = req.body;
	if (!token || !password)
		return res.status(400).send("Bad request");
	try
	{
		const hashedPassword = await bcrypt.hash(password, 10);
		const row = await db.get("SELECT `email` FROM `password_tokens` WHERE `token` = ?",
			[token]);
		if (!row)
			throw "Email not found in password tokens.";
		const email = row.email;
		await db.run("UPDATE `users` SET `password` = ? WHERE `email` = ?",
			[hashedPassword, email]);
		await db.run("DELETE FROM `password_tokens` WHERE `token` = ?",
			[token]);
		res.status(200).send(`Password changed for ${email}!`);
	} catch (error)
	{
		console.error("Sql error : " + error.message);
		res.status(500).send(error.message);
	}
});

export { router };
