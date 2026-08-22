import express from "express";
import { promises as dns } from 'node:dns';

const router = express.Router();

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

export { router };
