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
})

router.post('/sendEmail', async (req, res) => {
	const { email } = req.body;
	if (!email)
		return res.status(400).send("Bad request");
	const domain = email.split('@');
	if (domain.length != 2)
		return res.status(400).send("Bad request: Wrong email");
	try
	{
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Clownder - Verify your email",
			text: "UUUUU je suius yun virus2 qaahaha!!!!"
		});
		return res.status(200).send();
	} catch (error)
	{
		res.status(500).send("Error when sending confirmation email : " + error.message);
	}
})

export { router };
