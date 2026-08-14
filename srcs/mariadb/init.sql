create database if not exists `matcha`;

use `matcha`;

create table if not exists `users` (
	`id` int auto_increment,
	`username` varchar(15) not null,
	`password` varchar(255) not null,
	`first_name` varchar(50) not null,
	`last_name` varchar(50) not null,
	`gender` char not null,
	`email` varchar(255) not null,
	`fame_rating` int not null default 0,
	`city` varchar(255) not null,
	`created_at` date default current_date not null,
	primary key(`id`)
);

create table if not exists `test` (
	`id` int auto_increment,
	`username` varchar(15) not null,
	primary key(`id`)
);
