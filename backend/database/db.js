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
		email text not null,
		fame_rating integer not null default 0,
		city text not null,
		created_at numeric default current_date not null
	);
`);

await db.exec(`
	CREATE TABLE IF NOT EXISTS test (
		id integer primary key autoincrement,
		username text not null unique
	);
`);

export default db;
