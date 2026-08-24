import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const db = await open ({
	filename: './database.sqlite',
	driver: sqlite3.Database,
});

await db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		id integer primary key autoincrement,
		username text unique not null,
		password text not null,
		first_name text not null,
		last_name text not null,
		gender text not null,
		email text unique not null,
		email_verified integer not null default 0,
		fame_rating integer not null default 0,
		city text not null,
		created_at numeric default current_date not null
	);
`);

await db.exec(`
	CREATE TABLE IF NOT EXISTS user_sessions (
		id integer primary key autoincrement,
		username text not null unique,
		token text not null unique,
		start_date numeric not null,
		end_date numeric not null
	);
`);

await db.exec(`
	CREATE TABLE IF NOT EXISTS mail_tokens (
		id integer primary key autoincrement,
		email text not null unique,
		token text not null unique
	);
`);

// Default user for testing purposes
await db.exec(`
	INSERT OR IGNORE INTO users (
		username,
		password,
		first_name,
		last_name,
		gender,
		email,
		email_verified,
		fame_rating,
		city)
	VALUES (
		"d",
		"d",
		"d",
		"d",
		"F",
		"d",
		1,
		1000000,
		"d"
	);
`);

export default db;
