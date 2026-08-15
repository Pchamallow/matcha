import sqlite3 from 'sqlite3';
import { open } from 'squilte';

const db = await open ({
	filename: './database.sqlite',
	driver: sqlite3.Database,
});

await db.exec(`
	CREATE TABLE IF NOT EXISTS users (
		id int auto_increment,
		username varchar(15) not null,
		password varchar(255) not null,
		first_name varchar(50) not null,
		last_name varchar(50) not null,
		gender char not null,
		email varchar(255) not null,
		fame_rating int not null default 0,
		city varchar(255) not null,
		created_at date default current_date not null,
		primary key(id)
	);
`);

await db.exec(`
	CREATE TABLE IF NOT EXISTS test (
		id int auto_increment,
		username varchar(15) not null,
		primary key(id)
	);
`);

export default db;