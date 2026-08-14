#!/bin/bash

set -eu

if [ ! -d "/var/lib/mysql" ]; then
	mariadb-install-db --user=mysql --datadir="/var/lib/mysql"
	mariadb < init.sql
fi

mariadbd --user=mysql --datadir="/var/lib/mysql"
