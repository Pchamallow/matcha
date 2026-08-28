import express from "express";
import { promises as dns } from 'node:dns';
import nodemailer from "nodemailer";

const router = express.Router();
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

router.get('/checkEmail', async (req, res) => {
	const { email } = req.query;
	if (!email)
		return res.status(400).send("Bad request");
	const domain = email.split('@');
	if (domain.length != 2)
		return res.status(400).send("Bad request: Wrong email");
	try
	{
		const records = await dns.resolveMx(domain[1]);
		if (records.length > 0)
			return res.status(200).send();
		res.status(404).send();
	} catch (error)
	{
		res.status(500).send("DNS's MX check error : " + error.message);
	}
});

router.post('/sendEmail', async (req, res) => {
	const { email } = req.body;
	if (!email)
		return res.status(400).send("Bad request");
	const domain = email.split('@');
	if (domain.length != 2)
		return res.status(400).send("Bad request: Wrong email");
	try
	{
		const token = crypto.randomUUID().replaceAll("-", "");
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Clownder - Verify your email",
			text: `http://localhost:5173/?verify=${token}`
		});
		const response = await fetch("/api/db/registerEmail", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({email, token})
		});
		if (!response.ok)
		{
			console.log("Error while registering token to database: " + error.message);
			throw await response.text();
		}
		return res.status(200).send();
	} catch (error)
	{
		res.status(500).send("Error when sending confirmation email : " + error.message);
	}
})

export { router };
